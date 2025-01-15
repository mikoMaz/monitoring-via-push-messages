package com.example.monitoring.core.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.monitoring.core.api.abstraction.IDevicesModelService;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class WebDevicesModelController {

    private final IDevicesModelService devicesModelService;

    @GetMapping("/jsonTree")
    public ResponseEntity<String> jsonTree(@RequestParam String companyId) {
        JsonObject jsonTree = devicesModelService.getJsonTree(companyId);
        return ResponseEntity.ok().body(jsonTree.toString());
    }

    @GetMapping("/historyTree")
    public ResponseEntity<String> historyTree(@RequestParam String companyId) {
        JsonObject historyTree = devicesModelService.getHistoryTree(companyId);
        return ResponseEntity.ok().body(historyTree.toString());
    }
    @GetMapping("/newHistoryTree")
    public ResponseEntity<String> newHistoryTree(@RequestParam String companyId,Long startTimeStamp,Long stopTimeStamp,String period){
        JsonArray historyTree = devicesModelService.getStatsByPeriod(companyId,startTimeStamp,stopTimeStamp,period);
        return ResponseEntity.ok().body(historyTree.toString());
    }


    @GetMapping("/historySingleDevice")
    public ResponseEntity<String> singleDeviceHistory(@RequestParam String companyId, String device_id) {
        JsonObject singleDeviceHistory = devicesModelService.getSingleDeviceHistory(companyId, device_id);
        if (singleDeviceHistory == null) {
            return ResponseEntity.badRequest().body("");
        }
        return ResponseEntity.ok().body(singleDeviceHistory.toString());
    }
}
