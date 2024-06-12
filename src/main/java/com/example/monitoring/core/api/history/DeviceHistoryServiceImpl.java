package com.example.monitoring.core.api.history;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class DeviceHistoryServiceImpl implements DeviceHistoryService {
    private final DeviceHistoryRepository repository;
    
    public void save(DeviceHistory record){

    repository.save(record);
    }
}
