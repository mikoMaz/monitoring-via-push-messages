package com.example.monitoring.core.gateway;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.monitoring.core.bridge.BridgeData;
import com.example.monitoring.core.sensor.SensorDataSimplified;

import java.util.List;
import java.util.Optional;

public interface GatewayRepository extends JpaRepository<GatewayData, String> {


 @Query(value = "SELECT *\r\n" + //
          "FROM\r\n" + //
          "\t(SELECT *,\r\n" + //
          "\t\t\tROW_NUMBER() OVER(PARTITION BY gateway_eui \r\n" + //
          "\t\t\t\t\t\t\t\tORDER BY LOGGED_AT DESC)AS RN\r\n" + //
          "\t\tFROM GATEWAY_DATA) T\r\n" + //
          "WHERE T.RN = 1 AND T.bridge_serial_number=?1", nativeQuery = true)
 public List<GatewayData> allGatewaysConnectedToBridge(String serialNumber);

}
