package com.example.monitoring.core.api;

import lombok.RequiredArgsConstructor;

import java.util.Map;

import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.monitoring.core.status.DeviceStatusService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.example.monitoring.core.api.auth.AuthenticationService;
import com.example.monitoring.core.api.history.DeviceHistory;
import com.example.monitoring.core.api.history.DeviceHistoryService;
import com.example.monitoring.core.status.DeviceStatus;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class DeviceDataController {

    private final DeviceStatusService statusService;
    private final AuthenticationService authenticationService;
    private final DeviceDataService deviceDataService;
    private final DeviceHistoryService historyService;
    org.slf4j.Logger  logger =LoggerFactory.getLogger(DeviceDataController.class);

    @PostMapping("/sensor/send-data")
    public ResponseEntity<String>hello(
            @RequestBody Map<String, Object>  payloadJson,
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authenticationService.extractToken(authHeader);
        String deviceType = authenticationService.extractDeviceType(token);
        DeviceData pal = deviceDataService.buildObject(payloadJson, deviceType);
        deviceDataService.saveToDatabase(pal);

        DeviceStatus deviceStatus = statusService.getDeviceStatus(pal.getDeviceId());

        if (deviceStatus == null) {
            logger.info("no device status");
            logger.info(pal.getDeviceId());
            statusService.saveFromArgs(pal.getDeviceId(), pal.getTimestamp(), pal.getTimestamp());
        }
        else {
            int status = statusService.getCalculatedStatus(pal.getDeviceId(),pal.getTimestamp());
            Long latestLoggedTime = deviceStatus.getLogged_at();
            if (status == 0) {
                historyService.save(DeviceHistory.builder().deviceId(pal.getDeviceId()).end_timestamp(pal.getTimestamp()).start_timestamp(latestLoggedTime).length(pal.getTimestamp() - latestLoggedTime).build());
            }
            logger.info(pal.getDeviceId(), pal.getTimestamp(), deviceStatus.getFirst_logged_at());

            statusService.saveFromArgs(pal.getDeviceId(), pal.getTimestamp(), deviceStatus.getFirst_logged_at());
        }
        return ResponseEntity.ok("Everything is alright.");
    }
    @PostMapping("/user/prehistory")
    public ResponseEntity<String>prehistory(
        @RequestBody Map<String, Object>  payloadJson,
        @RequestHeader("Authorization") String authHeader
) {
    String token = authenticationService.extractToken(authHeader);
    String deviceType = authenticationService.extractDeviceType(token);
    DeviceData pal = deviceDataService.buildObject(payloadJson, deviceType);
    deviceDataService.saveToDatabase(pal);

    DeviceStatus deviceStatus = statusService.getDeviceStatus(pal.getDeviceId());

    if (deviceStatus == null) {
        logger.info(pal.getDeviceId());
        logger.info(String.valueOf(pal.getTimestamp()));

        statusService.saveFromArgs(pal.getDeviceId(), pal.getTimestamp(), pal.getTimestamp());
    }
    else {
        logger.info(pal.getDeviceId(), pal.getTimestamp(), deviceStatus.getFirst_logged_at());
        statusService.saveFromArgs(pal.getDeviceId(), pal.getTimestamp(), deviceStatus.getFirst_logged_at());
    }
    return ResponseEntity.ok("Everything is alright.");
}
}
