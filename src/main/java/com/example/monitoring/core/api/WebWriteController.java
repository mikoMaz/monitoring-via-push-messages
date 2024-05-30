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


@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class WebWriteController {
    private final BridgeService bridgeService;
    private final GatewayService gatewayService;
    private final SensorDataSimplifiedService sensorService;
    @GetMapping("/kluczdostepu")
    public ResponseEntity<String> jsonTree(@RequestParam Integer id) {
        List<BridgeData> bdList;
        List<GatewayData> gatewayList;
        List<SensorDataSimplified> sensorList;
        StringBuilder sb=new StringBuilder(1000);
        bdList = bridgeService.allBridges(id);
        for(int i=0;i<bdList.size();i++)
        {   BridgeData bridge=bdList.get(i);
            sb.append("#B "+bridge.getCompany_id().toString()+" "+bridge.getSerial_number()+" "+bridge.getLogged_at()+"\n");
            gatewayList=gatewayService.allGatewaysConnectedToBridge(bridge.getSerial_number());
            for(int j=0;j<gatewayList.size();j++)
            {
                GatewayData gateway= gatewayList.get(j);
                sb.append("\t #G"+gateway.getGateway_eui()+" "+gateway.getLogged_at()+"\n");
                sensorList=sensorService.allSensorsConnectedToSmartbox(gateway.getGateway_eui());
                for(int k=0;k<sensorList.size();k++)
                {
                    SensorDataSimplified sensor=sensorList.get(k);
                    sb.append("\t\t#S "+sensor.getSensor()+sensor.getReading_time()+"\n");

                }
            }
            sb.append("\n################################\n");
        }
        return ResponseEntity.ok().body(sb.toString());
    }
    
}
