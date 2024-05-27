package com.example.monitoring.core.api.auth;

import com.example.monitoring.core.api.payload.Payload;
import com.example.monitoring.core.api.payload.PayloadRepository;
import com.example.monitoring.core.api.payload.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PayloadService {
    private final PayloadRepository repository;

    public String newRecord(NewRecordRequest request) {
        var device = Payload.builder()
                .deviceId(request.getDeviceId())
                .deviceType(request.getDeviceType())
                .role(Role.DEVICE)
                .timestamp(System.currentTimeMillis() / 1000)
                .build();
        repository.save(device);
        return "Success!";
    }
}
