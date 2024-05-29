package com.example.monitoring.core.bridge;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BridgeRepository extends JpaRepository<BridgeData, String> {

 @Query(value = "SELECT * FROM (select *,row_number() over(partition by username order by logged_at desc)as rn from gateway_data) t where t.rn=1", nativeQuery = true)
 public List<BridgeData> allBridges(Integer company_id);
}
