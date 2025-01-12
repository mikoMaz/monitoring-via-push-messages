package com.example.monitoring.core.api.history;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DeviceHistoryRepository extends JpaRepository<DeviceHistory, String> {
    @Query(value = "select SUM(length) from device_history where device_id=?1", nativeQuery = true)
    Long sumDowntime(String Id);
}
