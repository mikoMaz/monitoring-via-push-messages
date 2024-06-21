package com.example.monitoring.core.external.fieldmapping;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FieldMapDataRepository extends JpaRepository<FieldMapData, String> {
    List<FieldMapData> findByDeviceTypes(DeviceTypes deviceTypes);
}
