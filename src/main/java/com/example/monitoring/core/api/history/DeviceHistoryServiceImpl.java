package com.example.monitoring.core.api.history;

import org.springframework.stereotype.Service;

import com.example.monitoring.core.api.auth.AuthenticationController;
import com.example.monitoring.core.status.DeviceStatus;
import com.example.monitoring.core.status.DeviceStatusRepository;
import org.slf4j.LoggerFactory;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class DeviceHistoryServiceImpl implements DeviceHistoryService {
    private final DeviceHistoryRepository repository;
    private final DeviceStatusRepository  statusRepository;
    org.slf4j.Logger  logger =LoggerFactory.getLogger(AuthenticationController.class);
    public void save(DeviceHistory record){

    repository.save(record);
    }
    @Override
    public Double uptimePercent(String Id) {
        Long downtime= repository.sumDowntime(Id);
        if (downtime==null)
        downtime=0L;
        DeviceStatus ds =statusRepository.getObjectById(Id);
        if(ds==null)
        return null;
        Long unixTime= System.currentTimeMillis() / 1000L;
        Long uptime=unixTime-ds.getFirst_logged_at();
        Long downtime_estimate=unixTime-ds.getLogged_at();

        return ((uptime-downtime_estimate-downtime)/(double)uptime)*100;
    }
}
