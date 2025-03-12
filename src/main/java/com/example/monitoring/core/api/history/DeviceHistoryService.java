package com.example.monitoring.core.api.history;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

public interface DeviceHistoryService {
        void save(DeviceHistory record);

        Double uptimePercent(String Id);

        Map<String, List<Double>> uptimePercentByPeriod(List<String> Id, Long StartTimeStamp, Long StopTimeStamp,
                        Long period);

        Map<String, List<Map.Entry<Long, Long>>> deviceIncidentList(List<String> Id, Long StartTimeStamp,
                        Long StopTimeStamp);

        Map<Integer, Entry<Double, Map<String, List<Entry<Long, Long>>>>> uptimePercentByPeriodandIncidents(
                        List<String> deviceIds,
                        Long StartTimeStamp,
                        Long StopTimeStamp, Long period);
}
