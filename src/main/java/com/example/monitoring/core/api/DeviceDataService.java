package com.example.monitoring.core.api;

import java.util.Map;

public interface DeviceDataService {
    DeviceData buildObject(Map<String, Object> payload, String deviceType);
    void saveToDatabase(DeviceData builtPayload);
}
