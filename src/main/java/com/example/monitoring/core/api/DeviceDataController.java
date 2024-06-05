package com.example.monitoring.core.api;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;

import org.aspectj.weaver.tools.Trace;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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

    org.slf4j.Logger  logger =LoggerFactory.getLogger(AuthenticationController.class);
    ObjectMapper objectMapper = new ObjectMapper();
    ObjectReader reader = new ObjectMapper().readerFor(Map.class);

    @PostMapping("/send-data")
    public ResponseEntity<String>hello(
            @RequestBody Map<String, Object>  payloadJson
    ) {
        /* SENSOR */
        if (payloadJson.containsKey("severity")) {
             SensorData payload = objectMapper.convertValue(payloadJson, SensorData.class);
//             SensorData payload= objectMapper.readValue(payloadJson, SensorData.class);
             SensorDataSimplified payloadSimplified = payload.toSensorDataSimplified();
             logger.info(payloadSimplified.toString());
             statusService.saveFromArgs(payloadSimplified.getSensor(),payloadSimplified.getReading_time());
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
            statusService.saveFromArgs(gateway.getGateway_eui(), gateway.getLogged_at());
            return ResponseEntity.ok().body(gateway.toString());
        }
        /* BRIDGE */
        if (payloadJson.containsKey("serial_number")) {
            BridgeRequest payload = objectMapper.convertValue(payloadJson, BridgeRequest.class);
            logger.info(payload.toString());
            BridgeData bridge=bridgeService.saveSimplified(payload);
            statusService.saveFromArgs(bridge.getSerial_number(), bridge.getLogged_at());

            return ResponseEntity.ok().body(bridge.toString());
        }
         return ResponseEntity.badRequest().body("err: unknown payload");
    }
    @GetMapping("/get-latest-sensor")
    public String latestSensor(
            @RequestBody String  payloadJson
    ) throws JsonMappingException, JsonProcessingException {
        Map<String, Object> map = reader.readValue(payloadJson);
        Integer company_id=(Integer)map.get("company_id");
        SensorDataSimplified latest= repository.findLastReadingTime(company_id);
//        return ResponseEntity.ok().body(company_id.toString()+"\n"+latest.toString());
        return latest.toString();

    }
    @GetMapping("/get-time-since-response")
    public ResponseEntity<String>timeSinceLastResponse(
            @RequestBody String  payloadJson
    ) throws JsonMappingException, JsonProcessingException {
        Map<String, Object> map = reader.readValue(payloadJson);
        Integer company_id=(Integer)map.get("company_id");
        SensorDataSimplified latest= repository.findLastReadingTime(company_id);
        Long unixTime = System.currentTimeMillis() / 1000L;
        Long time = unixTime-latest.getReading_time();
        return ResponseEntity.ok().body(time.toString());

    }
    @GetMapping("/get-fraction-of-uptime")
    public ResponseEntity<String>fractionOfUptime(
        @RequestBody String  payloadJson
) throws JsonMappingException, JsonProcessingException {
    Map<String, Object> map = reader.readValue(payloadJson);
    Integer company_id=(Integer)map.get("company_id");
        Long unixTime = System.currentTimeMillis() / 1000L;
        Integer totalSensors= repository.totalSensors(company_id);
        Integer upSensors=repository.upSensors(company_id,unixTime-300);
        return ResponseEntity.ok().body(upSensors.toString()+"/"+totalSensors.toString());

    }
}