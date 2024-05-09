package com.example.monitoring.core.api.auth;
import java.util.Map;

import org.slf4j.LoggerFactory ;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.example.monitoring.core.api.payload.Payload;
import com.example.monitoring.core.sensor.SensorData;
import com.example.monitoring.core.sensor.SensorDataSimplified;
import com.example.monitoring.core.sensor.SensorDataSimplifiedRepository;
import com.example.monitoring.core.sensor.SensorDataSimplifiedService;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    @Autowired
    private SensorDataSimplifiedRepository repository;
    private final AuthenticationService authenticationService;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
//FIXME: only for test. if authentication set correctly remove this code 
    org.slf4j.Logger  logger =LoggerFactory.getLogger(AuthenticationController.class);
    ObjectMapper objectMapper = new ObjectMapper();
    ObjectReader reader = new ObjectMapper().readerFor(Map.class);

     @PostMapping("/send-data")
    public ResponseEntity<String>hello(
            @RequestBody String  payloadJson
    ) {
        try {
        SensorData payload= objectMapper.readValue(payloadJson, SensorData.class);
        SensorDataSimplified payloadSimplified= payload.toSensorDataSimplified();
        logger.info(payloadSimplified.toString());
        repository.save(payloadSimplified);
        return ResponseEntity.ok().body(payloadSimplified.toString());

        } catch (JsonMappingException e) {
        e.printStackTrace();
        return ResponseEntity.badRequest().body("err");
        } catch (JsonProcessingException e) {
        e.printStackTrace();
        return ResponseEntity.badRequest().body("err");
        }
        
    }
    @GetMapping("/get-lastest-sensor")
    public ResponseEntity<String>lastestSensor(
            @RequestBody String  payloadJson
    ) throws JsonMappingException, JsonProcessingException {
        Map<String, Object> map = reader.readValue(payloadJson);
        Integer company_id=(Integer)map.get("company_id");
        SensorDataSimplified lastest= repository.findLastReadingTime(company_id);
        return ResponseEntity.ok().body(company_id.toString()+"\n"+lastest.toString());

    }
    @GetMapping("/get-time-since-response")
    public ResponseEntity<String>timeSinceLastResponse(
            @RequestBody String  payloadJson
    ) throws JsonMappingException, JsonProcessingException {
        Map<String, Object> map = reader.readValue(payloadJson);
        Integer company_id=(Integer)map.get("company_id");
        SensorDataSimplified lastest= repository.findLastReadingTime(company_id);
        Long unixTime = System.currentTimeMillis() / 1000L;
        Long time = unixTime-lastest.getReading_time();
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
