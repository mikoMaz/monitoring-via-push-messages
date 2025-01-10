package com.example.monitoring.core.api.preview;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/preview")
public class PreviewAuthenticationController {

    @GetMapping("/check-authentication")
    public ResponseEntity<Void> checkAuthentication() {
        return ResponseEntity.ok().build();
    }
}
