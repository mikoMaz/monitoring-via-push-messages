package com.example.monitoring.core.device;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceRepository extends JpaRepository<Device, String> {
    void deleteDevicesByCompanyCompanyId(Long id);
}
