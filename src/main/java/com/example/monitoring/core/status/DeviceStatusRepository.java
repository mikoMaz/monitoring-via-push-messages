package com.example.monitoring.core.status;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DeviceStatusRepository extends JpaRepository<DeviceStatus, String>  {
    @Query
    (value = "SELECT * FROM device_status where device_id=?1", nativeQuery = true)
    DeviceStatus getObjectById(String Id);
    @Query
    (value = "SELECT * FROM device_status ds where(:currentTime-ds.logged_at )>:treshold AND ds.device_id IN :mylist", nativeQuery = true)
    List<DeviceStatus> findOfflineAndIdIn(@Param("mylist")List<String> IdList,@Param("currentTime") Long currentTime,@Param("treshold")Long treshold);
}
