package com.example.monitoring.core.api;

import org.springframework.stereotype.Component;

import com.example.monitoring.core.bridge.BridgeData;
import com.example.monitoring.core.gateway.GatewayData;
import com.example.monitoring.core.sensor.SensorData;
import com.example.monitoring.core.sensor.SensorDataSimplified;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import lombok.RequiredArgsConstructor;
@Component
@RequiredArgsConstructor
public class WebWritePreprocessor {
    private static final String f1="id";
    private static final String f2="status";
    private static final String f3="lastPinged";
    private static final String f4="deviceType";
    JsonObject convertToJsonTreeComponent(String DeviceId, Integer Status,Long Timestamp,Integer Type)
    {
        JsonObject device=new JsonObject();
        device.addProperty(f1,DeviceId);
        device.addProperty(f2,Status);
        device.addProperty(f3,Timestamp);
        device.addProperty(f4,Type);
        return device;
    }
    JsonObject convertToJsonTreeComponent(String DeviceId, Double Status,Long Timestamp,Integer Type)
    {
        JsonObject device=new JsonObject();
        device.addProperty(f1,DeviceId);
        device.addProperty(f2,Status);
        device.addProperty(f3,Timestamp);
        device.addProperty(f4,Type);
        return device;
    }
   
}
