package com.example.monitoring.core.bridge;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BridgeRepository extends JpaRepository<BridgeData, String> {

 @Query(value = "SELECT *\r\n" + //
          "FROM\r\n" + //
          "\t(SELECT *,\r\n" + //
          "\t\t\tROW_NUMBER() OVER(PARTITION BY serial_number\r\n" + //
          "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tORDER BY logged_at DESC)AS RN\r\n" + //
          "\t\tFROM BRIDGE_DATA) T\r\n" + //
          "WHERE T.RN = 1 AND T.company_id = ?1", nativeQuery = true)
 public List<BridgeData> allBridges(Integer company_id);
}
