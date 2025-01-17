package com.example.monitoring.core.alert;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/alert/")
@RequiredArgsConstructor
public class AlertController {
    private final AlertService alertService;
    private final SendAlert sendAlert;

    @PostMapping("/stop-alert")
    public ResponseEntity<String> stopAlert(
            @RequestBody String alertId,
            @RequestHeader("Authorization") String authHeader) {
        alertService.setAlertIgnoreState(alertId, true);
        sendAlert.stopAlert(alertId);
        return ResponseEntity.ok(" ");
    };

    @PostMapping("/new-alert")
    public ResponseEntity<String> addNewAlert(
            @RequestBody String payload,
            @RequestHeader("Authorization") String authHeader) {
        alertService.addNewAlert(payload);
        return ResponseEntity.ok(" ");
    };

    @PostMapping("/remove-alert")
    public ResponseEntity<String> removeAlert(
            @RequestBody String id,
            @RequestHeader("Authorization") String authHeader) {
        alertService.deleteById(id);
        return ResponseEntity.ok(" ");
    };

    @PostMapping("/update-alert")
    public ResponseEntity<String> updateAlert(
            @RequestBody Map<String, Object> payloadJson,
            @RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(" ");
    };

    @PostMapping("/ignore")
    public ResponseEntity<String> ignoreAlert(
            @RequestBody Map<String, Object> payloadJson,
            @RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(" ");
    };

    @GetMapping("/get-alerts")
    public ResponseEntity<String> getAlertsForCompany(
            @RequestBody Long companyId,
            @RequestHeader("Authorization") String authHeader) {
        AlertDataSerializer ads = new AlertDataSerializer();
        JsonObject root = new JsonObject();
        JsonArray jsonAlerts = new JsonArray();
        ArrayList<AlertData> companyAlerts = alertService.getAlertsForCompany(companyId);
        for (AlertData alert : companyAlerts) {
            jsonAlerts.add(ads.serialize(alert, alert.getClass(), null));
        }
        root.add("Alerts", jsonAlerts);
        return ResponseEntity.ok().body(root.toString());
    }
}
