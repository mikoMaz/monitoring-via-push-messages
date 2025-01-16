package com.example.monitoring.core.api.history;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.function.Function;
import java.util.function.ToDoubleBiFunction;
import java.util.stream.Collectors;

import org.slf4j.LoggerFactory;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Service;

import com.example.monitoring.core.external.DataHolder;
import com.example.monitoring.core.external.DataHolderService;
import com.example.monitoring.core.status.DeviceStatus;
import com.example.monitoring.core.status.DeviceStatusRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DeviceHistoryServiceImpl implements DeviceHistoryService {
    private final DeviceHistoryRepository repository;
    private final DeviceStatusRepository statusRepository;
    private final DataHolderService dataHolderService;
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
    public Map<String,List<Double>> uptimePercentByPeriod(List<String> deviceIds ,Long StartTimeStamp,Long StopTimeStamp,Long period){
        logger.info("starting procedure for:");
        logger.info(deviceIds.toString());
        boolean trimStart=false;
        boolean trimEnd=false;
        List<DeviceHistory> Timestamps; 
        Map<String,List<DeviceHistory>> TimestampMap; 
        Map<String,List<Double>> uptimes= new HashMap<String,List<Double>>();
        for(String device:deviceIds)
        {
            uptimes.put(device, new ArrayList<Double>());
        }
        Double periods_count=Math.ceil((StopTimeStamp-StartTimeStamp)/period.doubleValue());
        int pc=periods_count.intValue();
        List<DeviceHistory> deviceTimestamps;
        Long downtimeUnit=0L;
        // for every period 
        for (int i =0;i<pc;i++)
        {
            logger.info("period:");
            logger.info(String.valueOf(i));
            Timestamps = repository.timeStampsFromPeriod(deviceIds,StartTimeStamp+(i)*period,StartTimeStamp+(i+1)*period);
            TimestampMap = Timestamps.stream().collect(Collectors.groupingBy(DeviceHistory::getDeviceId));

            // for every deviceID 
            for(String key:uptimes.keySet())
                {
                    downtimeUnit=0L;
                    deviceTimestamps = TimestampMap.get(key);
                    //3 przypadki
                    if(deviceTimestamps==null)
                    deviceTimestamps=new ArrayList<DeviceHistory>();

                    if(deviceTimestamps.size()==0)
                    // means no devices in period;
                    {                         
                        List<Double> devicePeriodUptimes = uptimes.get(key);
                        if(devicePeriodUptimes.size()==0)
                            devicePeriodUptimes.addLast(-1d);
                        else{
                            if(uptimes.get(key).getLast()==-1d)
                            {
                                devicePeriodUptimes.addLast(-1d);
                            }
                            else
                            {
                                devicePeriodUptimes.addLast(1d);
                            }
                       }
                        uptimes.replace(key, devicePeriodUptimes);
                    }
                    else{
                        for(DeviceHistory timestamp:deviceTimestamps)
                        {   //jeżeli device_start <=
                            logger.info(timestamp.toString());
                            trimStart=false;
                            trimEnd=false;
                            if(timestamp.getStart_timestamp()<=StartTimeStamp+(i)*period)
                            {   
                                trimStart=true;
                                logger.info("trimStart");
                            }
                            // jeżeli device_end >=                        
    
                            if(timestamp.getEnd_timestamp()>=StartTimeStamp+(i+1)*period)
                            {
                                trimEnd=true;
                                logger.info("trimEnd");
                            }                  
                            
                            if(trimEnd)
                                downtimeUnit+=StartTimeStamp+(i+1)*period;
                            else
                                downtimeUnit+=timestamp.getEnd_timestamp();      
                            if(trimStart)
                                downtimeUnit-=StartTimeStamp+(i)*period;
                            else
                                downtimeUnit-=timestamp.getStart_timestamp();
    
                            logger.info("downtime Unit:");
                            logger.info(downtimeUnit.toString());
    
                        }
                        logger.info("downtime Unit:");
                        logger.info(downtimeUnit.toString());
                        List<Double> devicePeriodUptimes = uptimes.get(key);
                        devicePeriodUptimes.addLast(1 - (downtimeUnit/(double)period));
                        uptimes.replace(key, devicePeriodUptimes);
                    }
                    
                }
             
        }
        int maxSize = uptimes.values().stream()
                .mapToInt(List::size)
                .max()
                .orElse(0);
        Map<String, List<Double>> result = new HashMap<>();
        for (int i = 0; i < maxSize; i++) {
            List<Double> tempList = new ArrayList<>();
            for (List<Double> values : uptimes.values()) {
                    tempList.add(values.get(i));
                }
            result.put(String.valueOf(i), tempList);
        }
     return result;
    }
}
