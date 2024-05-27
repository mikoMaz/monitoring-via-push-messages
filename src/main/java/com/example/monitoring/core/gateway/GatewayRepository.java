package com.example.monitoring.core.gateway;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface GatewayRepository extends JpaRepository<GatewayData, String> {
}
