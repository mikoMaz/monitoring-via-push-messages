package com.example.monitoring.core.api.history;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

import org.slf4j.LoggerFactory;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Service;

import com.example.monitoring.core.status.DeviceStatus;
import com.example.monitoring.core.status.DeviceStatusRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DeviceHistoryServiceImpl implements DeviceHistoryService {
    private final DeviceHistoryRepository repository;
    private final DeviceStatusRepository statusRepository;
    org.slf4j.Logger logger = LoggerFactory.getLogger(DeviceHistoryServiceImpl.class);

    public void save(DeviceHistory record) {

        repository.save(record);
    }

    @Override
    public Double uptimePercent(String Id) {
        Long downtime = repository.sumDowntime(Id);
        if (downtime == null)
            downtime = 0L;
        DeviceStatus ds = statusRepository.getObjectById(Id);
        if (ds == null)
            return null;
        Long unixTime = System.currentTimeMillis() / 1000L;
        Long uptime = unixTime - ds.getFirst_logged_at();
        Long downtime_estimate = unixTime - ds.getLogged_at();

        return ((uptime - downtime_estimate - downtime) / (double) uptime) * 100;
    }
    @Override
    public List<Double> uptimePercentByPeriod(String Id,Long StartTimeStamp,Long StopTimeStamp,Long period){
        List<DeviceHistory> startTimestamps = repository.startTimestampsFromPeriod(Id,StartTimeStamp,StopTimeStamp);
        List<DeviceHistory> endTimestamps = repository.endTimestampsFromPeriod(Id, StartTimeStamp, StopTimeStamp);
        startTimestamps.getLast().setEnd_timestamp(StopTimeStamp);
        endTimestamps.getFirst().setStart_timestamp(StartTimeStamp);
        TreeSet<Long> startTimes = new TreeSet(startTimestamps.stream().map(DeviceHistory::getStart_timestamp).collect(Collectors.toSet()));
        TreeSet<Long> endTimes = new TreeSet(endTimestamps.stream().map(DeviceHistory::getEnd_timestamp).collect(Collectors.toSet()));
        List<Double> uptimes=new ArrayList<>();
        if(startTimes.size()!=endTimes.size())
            logger.error("TimestampArrays sizes do not match");
        Double periods_count=Math.ceil((StopTimeStamp-StartTimeStamp)/period.doubleValue());
        int pc=periods_count.intValue();
        TreeSet<Long> periodBoundaries = new TreeSet<>();
        for (int i =1;i<pc;i++)
        {
            periodBoundaries.add(StartTimeStamp+period*pc);
            startTimes.add(StartTimeStamp+period*pc);
            endTimes.add(StartTimeStamp+period*pc); 
        }
        Iterator<Long> startIter=startTimes.iterator();
        Iterator<Long> endIter=endTimes.iterator();
        Iterator<Long> periodIter=periodBoundaries.iterator();
        Long startStamp;
        Long endStamp;
        Long periodBoundary;

        startStamp=startIter.next();
        endStamp=endIter.next();
        periodBoundary=periodIter.next();
        Long downtimeUnit=0l;
        for(int i=0;i<pc;i++){
            do
            {
                startStamp=startIter.next();
                endStamp=endIter.next();
                downtimeUnit+=endStamp-startStamp;
            }
            while(endStamp!=periodBoundary);
            uptimes.add(1-(double)downtimeUnit/period);
            downtimeUnit=0l;
        }
        return uptimes;
    }

}
