package com.example.monitoring.core.api.history;

public interface DeviceHistoryService {
    public void save(DeviceHistory record);
    public Float uptimePercent(String Id);
}
