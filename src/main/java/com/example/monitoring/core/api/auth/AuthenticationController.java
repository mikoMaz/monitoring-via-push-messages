package com.example.monitoring.core.api.auth;
import org.slf4j.LoggerFactory ;
import lombok.RequiredArgsConstructor;
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
import com.example.monitoring.core.api.payload.Payload;
import com.example.monitoring.core.sensor.SensorData;
import com.example.monitoring.core.sensor.SensorDataSimplified;
import com.example.monitoring.core.sensor.SensorDataSimplifiedRepository;
import com.example.monitoring.core.sensor.SensorDataSimplifiedService;
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
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
     @PostMapping("/test")
    public ResponseEntity<String>hello(
            @RequestBody String  payloadJson
    ) {
                
        try {
        SensorData payload= objectMapper.readValue(payloadJson, SensorData.class);
        SensorDataSimplified payloadSimplified= payload.toSensorDataSimplified();
        logger.info(payloadSimplified.toString());
        SensorDataSimplifiedRepository repository;
        SensorDataSimplifiedService service =new SensorDataSimplifiedService(repository);
        service.save(payloadSimplified);
        return ResponseEntity.ok().body(payloadSimplified.toString());

        } catch (JsonMappingException e) {
        e.printStackTrace();
        return ResponseEntity.badRequest().body("err");
        } catch (JsonProcessingException e) {
        e.printStackTrace();
        return ResponseEntity.badRequest().body("err");
        }
        
    }
   
}
