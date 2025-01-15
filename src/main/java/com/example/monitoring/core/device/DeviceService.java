package com.example.monitoring.core.device;

public interface DeviceService {
    void deleteDevicesForGivenCompany(Long companyId);

    void addNewDeviceWithDetails(String deviceId, String parentId, Long companyId);

    void addCompanyToDevice(String deviceId, Long companyId);
}
