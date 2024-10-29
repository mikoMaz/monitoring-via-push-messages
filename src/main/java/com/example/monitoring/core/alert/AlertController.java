package com.example.monitoring.core.alert;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.monitoring.core.api.auth.AuthenticationController;
import com.example.monitoring.core.api.history.DeviceHistoryService;
import com.example.monitoring.core.status.DeviceStatus;
import com.example.monitoring.core.status.DeviceStatusService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.google.gson.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/alert/")
@RequiredArgsConstructor
public class AlertController {
    org.slf4j.Logger  logger =LoggerFactory.getLogger(AuthenticationController.class);
    ObjectMapper objectMapper = new ObjectMapper();
    ObjectReader reader = new ObjectMapper().readerFor(Map.class);
    private final AlertService alertService;
    private final DeviceStatusService deviceStatusService;

    @PostMapping("/new-alert")
    public ResponseEntity<String>addNewAlert(
            @RequestBody  String  payload,
            @RequestHeader("Authorization") String authHeader
            
    ){
        JsonObject payloadJson=JsonParser.parseString(payload).getAsJsonObject();
        JsonObject alertJson=payloadJson.getAsJsonObject("details");
        JsonArray ignoredDevices=payloadJson.getAsJsonArray("ignored_devices");
        JsonArray observedDevices=payloadJson.getAsJsonArray("observed_devices");

        AlertData alertObject=alertService.buildObject(alertJson.toString());
        List<DeviceStatus>ignoredDevicesStatus = new ArrayList<>();
        for (JsonElement deviceId : ignoredDevices){
            String id=deviceId.getAsString();
            ignoredDevicesStatus.add(deviceStatusService.getDeviceStatus(id));
        }
        List<DeviceStatus>observedDevicesStatus = new ArrayList<>();
        for (JsonElement deviceId : observedDevices){
            String id=deviceId.getAsString();
            DeviceStatus ds =deviceStatusService.getDeviceStatus(id);
            observedDevicesStatus.add(ds);
        }
        
        alertObject.setIgnoredDevicesList(ignoredDevicesStatus);
        alertObject.setObservedDevicesList(observedDevicesStatus);

        alertService.saveToDatabase(alertObject);
        for (DeviceStatus deviceStatus : ignoredDevicesStatus){
            List<AlertData> adList =deviceStatus.getIgnoringAlert();
            adList.add(alertObject);
            deviceStatus.setIgnoringAlert(adList);
            deviceStatusService.saveToDatabase(deviceStatus);
        }
        alertService.saveToDatabase(alertObject);
        for (DeviceStatus deviceStatus : observedDevicesStatus){
            List<AlertData> adList =deviceStatus.getObservingAlert();
            adList.add(alertObject);
            deviceStatus.setObservingAlert(adList);
            deviceStatusService.saveToDatabase(deviceStatus);
        }
        return ResponseEntity.ok(" ");
    };
    @PostMapping("/remove-alert")
    public ResponseEntity<String>removeAlert(
            @RequestBody String  id,
            @RequestHeader("Authorization") String authHeader
            
    ){
        alertService.deleteById(id);
        return ResponseEntity.ok(" ");
    };
    @PostMapping("/update-alert")
    public ResponseEntity<String>updateAlert(
            @RequestBody Map<String, Object>  payloadJson,
            @RequestHeader("Authorization") String authHeader
    ){
        return ResponseEntity.ok(" ");
    };
}

