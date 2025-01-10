package com.example.monitoring.core.alert;

import com.example.monitoring.core.status.DeviceStatus;
import com.google.gson.Gson;
import com.google.gson.JsonArray;                       
import com.google.gson.JsonElement;                       
import com.google.gson.JsonObject;                       
import com.google.gson.JsonPrimitive;                       
import com.google.gson.JsonSerializationContext;                       
import com.google.gson.JsonSerializer;                       
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;                       
public class AlertDataSerializer implements JsonSerializer<AlertData> {                                                   
    
    public JsonObject serialize(AlertData alertData, Type type,                                   
        JsonSerializationContext jsonSerializationContext) { 
            JsonObject finalJson = new JsonObject();
            finalJson.addProperty("Id", alertData.getId());
            finalJson.addProperty("emailAdress",  alertData.getEmailAdress());
            finalJson.addProperty("companyId", alertData.getCompanyId());
            finalJson.addProperty("frequency",  alertData.getFrequency());
            finalJson.addProperty("duration",  alertData.getDelay());
            finalJson.addProperty("delay",  alertData.getDelay());
            finalJson.addProperty("ignore",  alertData.getIgnore());
            //finalJson.addProperty("ignoredDevicesList", alertData.getIgnoredDevicesList());
            List<DeviceStatus> observedDevices = alertData.getObservedDevicesList();
            List<String> observedDevicesIds = new ArrayList<String>();;
            for(DeviceStatus status  : observedDevices)
            {
                observedDevicesIds.add(status.getId());
            }
            List<DeviceStatus> ignoredDevices = alertData.getIgnoredDevicesList();
            List<String> ignoredDevicesIds = new ArrayList<String>();
            for(DeviceStatus status  : ignoredDevices)
            {
                ignoredDevicesIds.add(status.getId());
            }
            Gson gson = new Gson();
            finalJson.addProperty("observedDevicesList",  gson.toJson(observedDevicesIds));
            finalJson.addProperty("ingnoredDevicesList", gson.toJson(ignoredDevicesIds));
            return finalJson;
    }                       
}