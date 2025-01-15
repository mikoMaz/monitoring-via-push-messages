package com.example.monitoring.core.api.abstraction;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public interface IDevicesModelService {

    JsonObject getJsonTree(String id);

    JsonObject getHistoryTree(String id);

    JsonObject getSingleDeviceHistory(String companyId, String deviceId);

    JsonArray getStatsByPeriod(String companyId,Long startTimestamp,Long endTimestamp,String period);
}
