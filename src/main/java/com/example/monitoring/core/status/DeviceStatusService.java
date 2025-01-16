package com.example.monitoring.core.status;

import java.util.List;

public interface DeviceStatusService {
    void saveFromArgs(String Id, Long Timestamp, Long first_logged_at);

    void saveToDatabase(DeviceStatus deviceStatus);

    Integer getCalculatedStatus(String Id);

    Integer getCalculatedStatus(DeviceStatus deviceStatus);

    Integer getCalculatedStatus(String Id, Long compareTime);

    DeviceStatus getDeviceStatus(String Id);

    List<DeviceStatus> getOfflineDevices(Long companyId);
}
