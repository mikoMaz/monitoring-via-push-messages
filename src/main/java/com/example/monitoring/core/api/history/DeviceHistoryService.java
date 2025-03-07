package com.example.monitoring.core.api.history;

import java.util.List;
import java.util.Map;

public interface DeviceHistoryService {
    void save(DeviceHistory record);

    Double uptimePercent(String Id);

    Map<String, List<Double>> uptimePercentByPeriod(List<String> Id, Long StartTimeStamp, Long StopTimeStamp,
            Long period);

    Map<String, List<Map.Entry<Long, Long>>> deviceIncidentList(List<String> Id, Long StartTimeStamp,
            Long StopTimeStamp);
}
