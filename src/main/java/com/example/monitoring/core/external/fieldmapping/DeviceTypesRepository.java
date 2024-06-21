package com.example.monitoring.core.external.fieldmapping;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceTypesRepository extends JpaRepository<DeviceTypes, String> {
    DeviceTypes findByDeviceType(String deviceType);
}
