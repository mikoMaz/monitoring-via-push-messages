package com.example.monitoring.core.api.history;

import java.util.List;

public interface DeviceHistoryService {
    void save(DeviceHistory record);

    Double uptimePercent(String Id);
    List<Double> uptimePercentByPeriod(String Id,Long StartTimeStamp,Long StopTimeStamp,Long period);
}
