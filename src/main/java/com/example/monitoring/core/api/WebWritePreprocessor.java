package com.example.monitoring.core.api;

import org.springframework.stereotype.Component;

import com.example.monitoring.core.bridge.BridgeData;
import com.example.monitoring.core.gateway.GatewayData;
import com.example.monitoring.core.sensor.SensorDataSimplified;
import com.google.gson.JsonObject;

import lombok.RequiredArgsConstructor;
@Component
@RequiredArgsConstructor
public class WebWritePreprocessor {
    private static final String f1="id";
    private static final String f2="status";
    private static final String f3="lastPinged";
    private static final String f4="deviceType";
    JsonObject convertToJsonTreeComponent(BridgeData bridge,int status)
    {
        JsonObject device=new JsonObject();
        int deviceType=2;
        device.addProperty(f1,bridge.getSerial_number());
        device.addProperty(f2,status);
        device.addProperty(f3,bridge.getLogged_at());
        device.addProperty(f4,deviceType);
        return device;
    }
    JsonObject convertToJsonTreeComponent(GatewayData gateway,int status)
    {
        JsonObject device=new JsonObject();
        int deviceType=1;
       device.addProperty(f1,gateway.getGateway_eui());
       device.addProperty(f2,status);
       device.addProperty(f3,gateway.getLogged_at());
       device.addProperty(f4,deviceType);
       return device;

    }
    JsonObject convertToJsonTreeComponent(SensorDataSimplified sensor,int status)
    {
        JsonObject device=new JsonObject();
        int deviceType=0;
        device.addProperty(f1,sensor.getSensor());
        device.addProperty(f2,status);
        device.addProperty(f3,sensor.getReading_time());
        device.addProperty(f4,deviceType);
        return device;

    }
}
