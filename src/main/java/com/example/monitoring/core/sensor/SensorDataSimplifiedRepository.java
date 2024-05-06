package com.example.monitoring.core.sensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.NoArgsConstructor;

import java.util.Optional;
@Repository
public interface SensorDataSimplifiedRepository  extends JpaRepository<SensorDataSimplified, String> {
    
}