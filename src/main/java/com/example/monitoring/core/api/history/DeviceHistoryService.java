package com.example.monitoring.core.api.history;

public interface DeviceHistoryService {
    public void save(DeviceHistory record);
    public Double uptimePercent(String Id);
}
