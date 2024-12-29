package com.example.monitoring.core.alert;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AlertRepository extends JpaRepository<AlertData, String>{
    ArrayList<AlertData> findAllByCompanyId(String companyId);
    @Query
    (value = "SELECT * FROM alert_data a INNER JOIN  alert_observe_device ao ON a.id=ao.alert_id  where ao.device_id=?1", nativeQuery = true)
    ArrayList<AlertData> findAllObservingDevice(String deviceId);
}
  
