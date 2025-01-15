package com.example.monitoring.core.device;

public interface DeviceService {
    void deleteDevicesForGivenCompany(Long companyId);

    void addNewDeviceWithDetails(String deviceId, String parentId, Long companyId);

    void addCompanyToDevice(String deviceId, Long companyId);

    void detachParentForDevicesByCompanyId(Long companyId);

    void addParentIdToDevice(String deviceId, String parentId);
}
