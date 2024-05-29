package com.example.monitoring.core.api;

import lombok.RequiredArgsConstructor;

import org.aspectj.weaver.tools.Trace;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.monitoring.core.sensor.SensorDataSimplifiedService;
@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class WebWriteController {
    @GetMapping("/kluczdostepu")
    public ResponseEntity<String> jsonTree(@RequestBody String request) {
        
        return ResponseEntity.ok().body("{\"bridges\":[{\"id\":\"bridge1\",\"status\":0,\"lastPinged\":\"2024-05-13T12:00:00Z\",\"deviceType\":2,\"gateways\":[{\"id\":\"gateway1\",\"status\":0,\"lastPinged\":\"2024-05-13T12:05:00Z\",\"deviceType\":1,\"sensors\":[{\"id\":\"sensor1\",\"status\":0,\"lastPinged\":\"2024-05-13T12:10:00Z\",\"deviceType\":0},{\"id\":\"sensor2\",\"status\":1,\"lastPinged\":\"2024-05-13T12:15:00Z\",\"deviceType\":0},{\"id\":\"sensor5\",\"status\":0,\"lastPinged\":\"2024-05-13T12:17:00Z\",\"deviceType\":0},{\"id\":\"sensor6\",\"status\":1,\"lastPinged\":\"2024-05-13T12:19:00Z\",\"deviceType\":0},{\"id\":\"sensor7\",\"status\":0,\"lastPinged\":\"2024-05-13T12:21:00Z\",\"deviceType\":0}]}]}],\"gateways\":[{\"id\":\"gateway2\",\"status\":1,\"lastPinged\":\"2024-05-13T12:20:00Z\",\"deviceType\":1,\"sensors\":[{\"id\":\"sensor3\",\"status\":0,\"lastPinged\":\"2024-05-13T12:25:00Z\",\"deviceType\":0},{\"id\":\"sensor8\",\"status\":1,\"lastPinged\":\"2024-05-13T12:28:00Z\",\"deviceType\":0},{\"id\":\"sensor9\",\"status\":0,\"lastPinged\":\"2024-05-13T12:31:00Z\",\"deviceType\":0}]}],\"sensors\":[{\"id\":\"sensor4\",\"status\":1,\"lastPinged\":\"2024-05-13T12:30:00Z\",\"deviceType\":0},{\"id\":\"sensor10\",\"status\":0,\"lastPinged\":\"2024-05-13T12:34:00Z\",\"deviceType\":0},{\"id\":\"sensor11\",\"status\":1,\"lastPinged\":\"2024-05-13T12:36:00Z\",\"deviceType\":0},{\"id\":\"sensor12\",\"status\":0,\"lastPinged\":\"2024-05-13T12:38:00Z\",\"deviceType\":0}]}");
    }
    
}
