package com.example.monitoring.core.gateway;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.monitoring.core.bridge.BridgeData;
import com.example.monitoring.core.sensor.SensorDataSimplified;

import java.util.List;
import java.util.Optional;

public interface GatewayRepository extends JpaRepository<GatewayData, String> {


 @Query(value = "SELECT * FROM (select *,row_number() over(partition by username order by logged_at desc)as rn from gateway_data) t where t.rn=1", nativeQuery = true)
 public List<GatewayData> allGateways(Integer company_id);
}
