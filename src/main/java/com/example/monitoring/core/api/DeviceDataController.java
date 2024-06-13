package com.example.monitoring.core.api;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;

import org.aspectj.weaver.tools.Trace;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.monitoring.core.bridge.BridgeData;
import com.example.monitoring.core.bridge.BridgeRequest;
import com.example.monitoring.core.bridge.BridgeService;
import com.example.monitoring.core.gateway.GatewayData;
import com.example.monitoring.core.gateway.GatewayRequest;
import com.example.monitoring.core.gateway.GatewayService;
import com.example.monitoring.core.sensor.SensorData;
import com.example.monitoring.core.sensor.SensorDataSimplified;
import com.example.monitoring.core.sensor.SensorDataSimplifiedRepository;
import com.example.monitoring.core.sensor.SensorDataSimplifiedService;
import com.example.monitoring.core.status.DeviceStatusService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.example.monitoring.core.api.WebWritePreprocessor;
import com.example.monitoring.core.api.auth.AuthenticationController;
import com.example.monitoring.core.api.auth.AuthenticationRequest;
import com.example.monitoring.core.api.auth.AuthenticationResponse;
import com.example.monitoring.core.api.auth.AuthenticationService;
import com.example.monitoring.core.api.auth.RegisterRequest;
import com.example.monitoring.core.api.history.DeviceHistory;
import com.example.monitoring.core.api.history.DeviceHistoryService;
import com.example.monitoring.core.status.DeviceStatus;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor

public class DeviceDataController {

    @Autowired
    private SensorDataSimplifiedRepository repository;
    private final DeviceStatusService statusService;
    private final AuthenticationService authenticationService;
    private final GatewayService gatewayService;
    private final BridgeService bridgeService;
    private final DeviceHistoryService historyService;
    org.slf4j.Logger  logger =LoggerFactory.getLogger(AuthenticationController.class);
    ObjectMapper objectMapper = new ObjectMapper();
    ObjectReader reader = new ObjectMapper().readerFor(Map.class);
    Long unixTime;


    @PostMapping("/send-data")
    public ResponseEntity<String>hello(
            @RequestBody Map<String, Object>  payloadJson //,
            //@RequestHeader("Authorization") String authHeader
    ) {
        //String token = authenticationService.extractToken(authHeader);
        //String deviceId = authenticationService.extractDeviceId(token);

        /* SENSOR */
        if (payloadJson.containsKey("severity")) {
             SensorData payload = objectMapper.convertValue(payloadJson, SensorData.class);
//             SensorData payload= objectMapper.readValue(payloadJson, SensorData.class);
             SensorDataSimplified payloadSimplified = payload.toSensorDataSimplified();
             logger.info(payloadSimplified.toString());
             DeviceStatus deviceStatus=statusService.getDeviceStatus(payloadSimplified.getSensor());
             if(deviceStatus==null)
             {
                statusService.saveFromArgs(payloadSimplified.getSensor(),payloadSimplified.getReading_time(),payloadSimplified.getReading_time());
                return ResponseEntity.ok().body(payloadSimplified.toString());
             }
             int status=statusService.getCalculatedStatus(deviceStatus);
             unixTime= System.currentTimeMillis() / 1000L;
             Long latestLoggedTime=deviceStatus.getLogged_at();
             if(status==0){
                 historyService.save(DeviceHistory.builder().deviceId(payloadSimplified.getSensor()).end_timestamp(unixTime).start_timestamp(latestLoggedTime).length(unixTime-latestLoggedTime).build());
             }

             statusService.saveFromArgs(payloadSimplified.getSensor(),payloadSimplified.getReading_time(),deviceStatus.getFirst_logged_at());
             repository.save(payloadSimplified);
             return ResponseEntity.ok().body(payloadSimplified.toString());
         }
        /*if (payloadJson.containsKey("serial_number")) {
            GatewayData payload = objectMapper.convertValue(payloadJson, GatewayData.class);
//            SensorDataSimplified payloadSimplified = payload.toSensorDataSimplified();
            logger.info(payload.toString());
            gatewayRepository.save(payload);
            return ResponseEntity.ok().body(payload.toString());
        }*/
        /* GATEWAY */
        if (payloadJson.containsKey("bridge_serial_number")) {
            GatewayRequest payload = objectMapper.convertValue(payloadJson, GatewayRequest.class);
            logger.info(payload.toString());
            GatewayData gateway=gatewayService.saveSimplified(payload);

            DeviceStatus deviceStatus=statusService.getDeviceStatus(gateway.getGateway_eui());
            if(deviceStatus==null)
            {
                statusService.saveFromArgs(gateway.getGateway_eui(), gateway.getLogged_at(),gateway.getLogged_at());
                return ResponseEntity.ok().body(gateway.toString());
            }
            int status=statusService.getCalculatedStatus(deviceStatus);
            unixTime= System.currentTimeMillis() / 1000L;
            Long latestLoggedTime=deviceStatus.getLogged_at();
            if(status==0){
                historyService.save(DeviceHistory.builder().deviceId(gateway.getGateway_eui()).end_timestamp(unixTime).start_timestamp(latestLoggedTime).length(unixTime-latestLoggedTime).build());
            }
            statusService.saveFromArgs(gateway.getGateway_eui(), gateway.getLogged_at(),deviceStatus.getFirst_logged_at());

            return ResponseEntity.ok().body(gateway.toString());
        }
        /* BRIDGE */
        if (payloadJson.containsKey("serial_number")) {
            BridgeRequest payload = objectMapper.convertValue(payloadJson, BridgeRequest.class);
            logger.info(payload.toString());
            BridgeData bridge=bridgeService.saveSimplified(payload);
            DeviceStatus deviceStatus=statusService.getDeviceStatus(bridge.getSerial_number());
            if(deviceStatus==null)
            {
                statusService.saveFromArgs(bridge.getSerial_number(), bridge.getLogged_at(),bridge.getLogged_at());

                return ResponseEntity.ok().body(bridge.toString());
            }
            int status=statusService.getCalculatedStatus(deviceStatus);
            unixTime= System.currentTimeMillis() / 1000L;
            Long latestLoggedTime=deviceStatus.getLogged_at();
            
            if(status==0){
                historyService.save(DeviceHistory.builder().deviceId(bridge.getSerial_number()).end_timestamp(unixTime).start_timestamp(latestLoggedTime).length(unixTime-latestLoggedTime).build());
            }
            statusService.saveFromArgs(bridge.getSerial_number(), bridge.getLogged_at(),deviceStatus.getFirst_logged_at());

            return ResponseEntity.ok().body(bridge.toString());
        }
         return ResponseEntity.badRequest().body("err: unknown payload");
    }

}