package com.example.monitoring.core.api;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.aspectj.weaver.tools.Trace;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.example.monitoring.core.api.WebWritePreprocessor;
import com.example.monitoring.core.api.auth.AuthenticationController;
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

    org.slf4j.Logger  logger =LoggerFactory.getLogger(AuthenticationController.class);
    ObjectMapper objectMapper = new ObjectMapper();
    ObjectReader reader = new ObjectMapper().readerFor(Map.class);

    @GetMapping("/kluczdostepu")
    public ResponseEntity<String> jsonTree(@RequestParam Integer id) {
        List<BridgeData> bdList;
        List<GatewayData> gatewayList;
        List<SensorDataSimplified> sensorList;
        bdList = bridgeService.allBridges(id);

        JsonObject root=new JsonObject();
        ArrayList<JsonArray> list= new ArrayList<JsonArray>();
        JsonObject savedDevice=new JsonObject();
        for(int i=0;i<20;i++)
        {
            JsonArray devices= new JsonArray();
            list.add(devices);

        }
        JsonObject currentObject=new JsonObject();
        for(int i=0;i<bdList.size();i++)
        {   BridgeData bridge=bdList.get(i);
            currentObject=proc.convertToJsonTreeComponent(bridge, statusService.getCalculatedStatus(bridge.getSerial_number()));
            gatewayList=gatewayService.allGatewaysConnectedToBridge(bridge.getSerial_number());
            currentObject.addProperty("children_count", gatewayList.size());
            list.get(0).add(currentObject);
            for(int j=0;j<gatewayList.size();j++)
            {
                GatewayData gateway= gatewayList.get(j);
                sensorList=sensorService.allSensorsConnectedToSmartbox(gateway.getGateway_eui());
                JsonArray sensorArray = new JsonArray();

                for(int k=0;k<sensorList.size();k++)
                {
                    SensorDataSimplified sensor =sensorList.get(k) ;
                    JsonObject subDevice=proc.convertToJsonTreeComponent(sensor,statusService.getCalculatedStatus(sensor.getSensor()));
                    list.get(2).add(subDevice);
                }
                
                JsonObject subDevice=proc.convertToJsonTreeComponent(gateway, statusService.getCalculatedStatus(gateway.getGateway_eui()));
                subDevice.addProperty("children_count",sensorList.size());
                list.get(1).add(subDevice);
                savedDevice=subDevice;
            }
        }
        for(int i=0;i<20;i++)
        {
            if(list.get(i).size()==0)
            break;
            root.add("devices"+String.valueOf(i),list.get(i));
        }
        return ResponseEntity.ok().body(root.toString());
    }

    @GetMapping("/graph")
    public ResponseEntity<String> Graph(@RequestParam Integer id) {
        JsonObject root=new JsonObject();
        return ResponseEntity.ok().body(root.toString());
    }



    @GetMapping("/get-latest-sensor")
    public String latestSensor(@RequestBody String  payloadJson) throws JsonMappingException, JsonProcessingException {
        Map<String, Object> map = reader.readValue(payloadJson);
        Integer company_id=(Integer)map.get("company_id");
        SensorDataSimplified latest= sensorService.findLastReadingTime(company_id);
//        return ResponseEntity.ok().body(company_id.toString()+"\n"+latest.toString());
        return latest.toString();

    }
    @GetMapping("/get-time-since-response")
    public ResponseEntity<String>timeSinceLastResponse(@RequestBody String  payloadJson) throws JsonMappingException, JsonProcessingException {
        Map<String, Object> map = reader.readValue(payloadJson);
        Integer company_id=(Integer)map.get("company_id");
        SensorDataSimplified latest= sensorService.findLastReadingTime(company_id);
        Long unixTime = System.currentTimeMillis() / 1000L;
        Long time = unixTime-latest.getReading_time();
        return ResponseEntity.ok().body(time.toString());

    }
    @GetMapping("/get-fraction-of-uptime")
    public ResponseEntity<String>fractionOfUptime(@RequestBody String  payloadJson) throws JsonMappingException, JsonProcessingException {
    Map<String, Object> map = reader.readValue(payloadJson);
    Integer company_id=(Integer)map.get("company_id");
        Long unixTime = System.currentTimeMillis() / 1000L;
        Integer totalSensors= sensorService.totalSensors(company_id);
        Integer upSensors=sensorService.upSensors(company_id,unixTime-300);
        return ResponseEntity.ok().body(upSensors.toString()+"/"+totalSensors.toString());

    }
    
}
