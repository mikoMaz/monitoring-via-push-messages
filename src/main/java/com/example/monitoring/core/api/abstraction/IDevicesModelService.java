package com.example.monitoring.core.api.abstraction;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public interface IDevicesModelService {

    JsonObject getJsonTree(Long companyId);

    JsonObject getHistoryTree(Long companyId);

    JsonObject getSingleDeviceHistory(Long companyId, String deviceId);

    JsonArray getStatsByPeriod(Long companyId, Long startTimestamp, Long endTimestamp, String period);
}
