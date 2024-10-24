package com.example.monitoring.core.api.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.monitoring.core.sensor.SensorDataSimplifiedService;
@RestController
@RequestMapping("/api/v1/new-record")
@RequiredArgsConstructor
public class NewRecordController {
    private final PayloadService payloadService;
    private final SensorDataSimplifiedService sdService;
    @PostMapping("/add")
    public ResponseEntity<String> newRecord(@RequestBody String request) {
        
        return (sdService.save(request));
    }

}
