package com.example.monitoring.core.api;

import org.springframework.stereotype.Component;

import com.example.monitoring.core.bridge.BridgeData;
import com.example.monitoring.core.gateway.GatewayData;
import com.example.monitoring.core.sensor.SensorData;
import com.example.monitoring.core.sensor.SensorDataSimplified;

import lombok.RequiredArgsConstructor;
@Component
@RequiredArgsConstructor
public class WebWritePreprocessor {
    private static final String f1="id";
    private static final String f2="status";
    private static final String f3="lastPinged";
    private static final String f4="deviceType";
    String convertToJsonTreeComponent(BridgeData bridge,int status)
    {
        int deviceType=2;

        String w=String.format("{\"%1$s\": %2$s, \"%3$s\": %4$d, \"%5$s\": %6$s, \"%7$s\": %8$d, \"gateways\":[]}", f1,bridge.getSerial_number(),f2,status,f3,bridge.getLogged_at(),f4,deviceType);
        return w;
    }
    String convertToJsonTreeComponent(GatewayData gateway,int status)
    {
        int deviceType=1;
        String w=String.format("{\"%1$s\": %2$s, \"%3$s\": %4$d, \"%5$s\": %6$s, \"%7$s\": %8$d, \"sensors\":[]}", f1,gateway.getGateway_eui(),f2,status,f3,gateway.getLogged_at(),f4,deviceType);
        return w;
    }
    String convertToJsonTreeComponent(SensorDataSimplified sensor,int status)
    {
        int deviceType=0;
        String w=String.format("{\"%1$s\": %2$s, \"%3$s\": %4$d, \"%5$s\": %6$s, \"%7$s\": %8$d,}", f1,sensor.getSensor(),f2,status,f3,sensor.getReading_time(),f4,deviceType);
        return w;
    }
}
