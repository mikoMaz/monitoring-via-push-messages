package com.example.monitoring.core.api.history;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DeviceHistoryRepository extends JpaRepository<DeviceHistory, String> {
    @Query(value = "select SUM(length) from device_history where device_id=?1", nativeQuery = true)
    Long sumDowntime(String Id);
    @Query(value = "select * from device_history where device_id=?1 AND start_timestamp>=?2 AND start_timestamp>=?3 ORDER BY start_timestamp ASC ", nativeQuery = true)
    List<DeviceHistory> startTimestampsFromPeriod(String Id,Long PeriodStartTimeStamp,Long PeriodEndTimeStamp);
    @Query(value = "select * from device_history where device_id=?1 AND end_timestamp>=?2 AND end_timestamp>=?3 ORDER BY start_timestamp ASC", nativeQuery = true)
    List<DeviceHistory> endTimestampsFromPeriod(String Id,Long PeriodStartTimeStamp,Long PeriodStopTimeStamp);
}
