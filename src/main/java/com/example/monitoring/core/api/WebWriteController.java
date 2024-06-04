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
import com.example.monitoring.core.api.WebWritePreprocessor;


@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class WebWriteController {
    private final BridgeService bridgeService;
    private final GatewayService gatewayService;
    private final SensorDataSimplifiedService sensorService;
    private final WebWritePreprocessor proc;

    @GetMapping("/kluczdostepu")
    
    public ResponseEntity<String> jsonTree(@RequestParam Integer id) {
        List<BridgeData> bdList;
        List<GatewayData> gatewayList;
        List<SensorDataSimplified> sensorList;
        StringBuilder sb=new StringBuilder(1000);
        bdList = bridgeService.allBridges(id);
        sb.append("{\"bridges\": []}");
        int bridgeOffset;
        int gatewayOffset;
        for(int i=0;i<bdList.size();i++)
        {   BridgeData bridge=bdList.get(i);
            //TODO: evaluate status
            if(i<bdList.size()-1){
                sb.insert(sb.length()-2,proc.convertToJsonTreeComponent(bridge, bridge.getStatus())+",");
                bridgeOffset=1;
            }else
            {
                sb.insert(sb.length()-2,proc.convertToJsonTreeComponent(bridge, bridge.getStatus())+",");
                bridgeOffset=0;
            }
            gatewayList=gatewayService.allGatewaysConnectedToBridge(bridge.getSerial_number());
            for(int j=0;j<gatewayList.size();j++)
            {
                GatewayData gateway= gatewayList.get(j);
                if(j<gatewayList.size()-1){
                    gatewayOffset=1;
                    sb.insert(sb.length()-(4+bridgeOffset),proc.convertToJsonTreeComponent(gateway, gateway.getStatus())+",");
                }
                else
                {
                    gatewayOffset=0;
                    sb.insert(sb.length()-(4+bridgeOffset),proc.convertToJsonTreeComponent(gateway, gateway.getStatus()));
                }

                sensorList=sensorService.allSensorsConnectedToSmartbox(gateway.getGateway_eui());
                for(int k=0;k<sensorList.size();k++)
                {
                    SensorDataSimplified sensor=sensorList.get(k);
                    if(k<sensorList.size()-1){
                        sb.insert(sb.length()-(6+bridgeOffset+gatewayOffset),proc.convertToJsonTreeComponent(sensor, sensor.getStatus())+",");

                    }
                    else
                    sb.insert(sb.length()-(6+bridgeOffset+gatewayOffset),proc.convertToJsonTreeComponent(sensor, sensor.getStatus()));
                }
            }
        }
        return ResponseEntity.ok().body(sb.toString());
    }
    
}
