package com.example.monitoring.core.api.auth;
import java.util.Map;

import com.example.monitoring.core.bridge.BridgeRequest;
import com.example.monitoring.core.bridge.BridgeService;
import com.example.monitoring.core.gateway.GatewayData;
import com.example.monitoring.core.gateway.GatewayRepository;
import com.example.monitoring.core.gateway.GatewayRequest;
import com.example.monitoring.core.gateway.GatewayService;
import org.slf4j.LoggerFactory ;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
@RequestMapping("/api/v1/sensor/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    @Autowired
    private SensorDataSimplifiedRepository repository;
    private final AuthenticationService authenticationService;
    private final GatewayService gatewayService;
    private final BridgeService bridgeService;

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

}
