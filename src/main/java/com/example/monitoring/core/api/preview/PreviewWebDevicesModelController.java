package com.example.monitoring.core.api.preview;

import java.util.Optional;

import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.monitoring.core.api.abstraction.IDevicesModelService;
import com.example.monitoring.core.company.CompanyService;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/preview")
@RequiredArgsConstructor
public class PreviewWebDevicesModelController {

    private final IDevicesModelService devicesModelService;
    private final CompanyService companyService;
    org.slf4j.Logger logger = LoggerFactory.getLogger(PreviewWebDevicesModelController.class);

    @GetMapping("/jsonTree")
    public ResponseEntity<String> jsonTree(@RequestParam String companyName) {
        Long companyId = companyService.findCompanyByName(companyName).getCompanyId();
        JsonObject jsonTree = devicesModelService.getJsonTree(companyId);
        return ResponseEntity.ok().body(jsonTree.toString());
    }

    @GetMapping("/historyTree")
    public ResponseEntity<String> historyTree(@RequestParam String companyName) {
        Long companyId = companyService.findCompanyByName(companyName).getCompanyId();
        JsonObject historyTree = devicesModelService.getHistoryTree(companyId);
        return ResponseEntity.ok().body(historyTree.toString());
    }

    @GetMapping("/historyValues")
    public ResponseEntity<String> historyValues(@RequestParam String companyName, Long startTimeStamp,
            Long stopTimeStamp, String period, Optional<String> deviceId) {
        Long companyId = companyService.findCompanyByName(companyName).getCompanyId();
        logger.info("companyId");
        logger.info(String.valueOf(companyId));
        JsonArray historyDetails = devicesModelService.getUptimePercentByPeriodandIncidents(companyId, startTimeStamp,
                stopTimeStamp,
                period, deviceId);
        return ResponseEntity.ok().body(historyDetails.toString());

    }
}
