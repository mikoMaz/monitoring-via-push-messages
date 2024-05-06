package com.example.monitoring.core.sensor;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface SensorDataSimplifiedRepository  extends JpaRepository<SensorDataSimplified, String> {
}