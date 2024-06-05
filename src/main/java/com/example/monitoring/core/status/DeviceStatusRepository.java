package com.example.monitoring.core.status;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.monitoring.core.bridge.BridgeData;

public interface DeviceStatusRepository extends JpaRepository<DeviceStatus, String>  {
    @Query
    (value = "SELECT * FROM device_status where id=?1", nativeQuery = true)

    DeviceStatus getObjectById(String Id);
}
