package com.example.monitoring.core.model.payload;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PayloadRepository extends JpaRepository<Payload, String> {
    Optional<Payload> findByDeviceId(String deviceId);
}
