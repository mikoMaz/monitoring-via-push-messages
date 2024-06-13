package com.example.monitoring.core.api.history;

import org.springframework.stereotype.Service;

import com.example.monitoring.core.status.DeviceStatus;
import com.example.monitoring.core.status.DeviceStatusRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class DeviceHistoryServiceImpl implements DeviceHistoryService {
    private final DeviceHistoryRepository repository;
    private final DeviceStatusRepository  statusRepository;
    public void save(DeviceHistory record){

    repository.save(record);
    }
    @Override
    public Float uptimePercent(String Id) {
        Long downtime= repository.sumDowntime(Id);
        if (downtime==null)
        downtime=0L;
        DeviceStatus ds =statusRepository.getObjectById(Id);
        Long unixTime= System.currentTimeMillis() / 1000L;
        Long uptime=unixTime-ds.getFirst_logged_at();

        return (float)((uptime-downtime)/uptime)*100;
    }
}
