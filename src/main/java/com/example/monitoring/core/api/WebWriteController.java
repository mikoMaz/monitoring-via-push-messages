package com.example.monitoring.core.api;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.aspectj.weaver.tools.Trace;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.monitoring.core.bridge.BridgeData;
import com.example.monitoring.core.bridge.BridgeService;
import com.example.monitoring.core.gateway.GatewayData;
import com.example.monitoring.core.gateway.GatewayService;
import com.example.monitoring.core.sensor.SensorDataSimplified;
import com.example.monitoring.core.sensor.SensorDataSimplifiedService;
import com.example.monitoring.core.status.DeviceStatus;
import com.example.monitoring.core.status.DeviceStatusService;
import com.example.monitoring.core.api.WebWritePreprocessor;
import com.google.gson.*;
@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class WebWriteController {
    private final BridgeService bridgeService;
    private final GatewayService gatewayService;
    private final SensorDataSimplifiedService sensorService;
    private final DeviceStatusService statusService;
    private final WebWritePreprocessor proc;

    @GetMapping("/kluczdostepu")
    
    public ResponseEntity<String> jsonTree(@RequestParam Integer id) {
        List<BridgeData> bdList;
        List<GatewayData> gatewayList;
        List<SensorDataSimplified> sensorList;
        bdList = bridgeService.allBridges(id);

        JsonObject root=new JsonObject();
        JsonArray devices= new JsonArray();
        JsonObject currentObject=new JsonObject();
        int bridgeOffset;
        int gatewayOffset;
        for(int i=0;i<bdList.size();i++)
        {   BridgeData bridge=bdList.get(i);
            JsonArray gatewayArray = new JsonArray();

            currentObject=proc.convertToJsonTreeComponent(bridge, statusService.getStatus(bridge.getSerial_number()));
            gatewayList=gatewayService.allGatewaysConnectedToBridge(bridge.getSerial_number());
            for(int j=0;j<gatewayList.size();j++)
            {
                GatewayData gateway= gatewayList.get(j);
                sensorList=sensorService.allSensorsConnectedToSmartbox(gateway.getGateway_eui());
                JsonArray sensorArray = new JsonArray();

                for(int k=0;k<sensorList.size();k++)
                {
                    SensorDataSimplified sensor =sensorList.get(k) ;
                    JsonObject subDevice=proc.convertToJsonTreeComponent(sensor,statusService.getStatus(sensor.getSensor()));
                    sensorArray.add(subDevice);
                }
                
                JsonObject subDevice=proc.convertToJsonTreeComponent(gateway, statusService.getStatus(gateway.getGateway_eui()));
                subDevice.add("devices",sensorArray);
                gatewayArray.add(subDevice);
            }
            currentObject.add("devices", gatewayArray);
            devices.add(currentObject);
        }
        root.add("devices",(devices));

        return ResponseEntity.ok().body(root.toString());
    }
    
}
