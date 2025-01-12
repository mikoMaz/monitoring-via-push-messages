package com.example.monitoring.core.api.history;

public interface DeviceHistoryService {
    void save(DeviceHistory record);
    Double uptimePercent(String Id);
}
