package com.example.monitoring.core.api;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceDataRepository extends JpaRepository<DeviceData, String> {
}
