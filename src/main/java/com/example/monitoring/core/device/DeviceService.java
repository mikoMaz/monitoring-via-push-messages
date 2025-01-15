package com.example.monitoring.core.device;

import java.util.List;

public interface DeviceService {
    void deleteDevicesForGivenCompany(Long companyId);

    void addNewDeviceWithDetails(String deviceId, String parentId, Long companyId);

    void addCompanyToDevice(String deviceId, Long companyId);

    void detachParentForDevicesByCompanyId(Long companyId);

    void addParentIdToDevice(String deviceId, String parentId);

    String getParentIdFromDevice(String deviceId);

    List<String> getAllChildrenForGivenCompanyId(Long companyId);
}
