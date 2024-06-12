package com.example.monitoring.core.api.history;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceHistoryRepository extends JpaRepository<DeviceHistory, String>  {
    
}
