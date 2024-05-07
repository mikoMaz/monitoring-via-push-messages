package com.example.monitoring.core.api.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/new-record")
@RequiredArgsConstructor
public class NewRecordController {
    private final PayloadService payloadService;

    @PostMapping("/add")
    public ResponseEntity<String> newRecord(@RequestBody NewRecordRequest request) {
        return ResponseEntity.ok(payloadService.newRecord(request));
    }

}
