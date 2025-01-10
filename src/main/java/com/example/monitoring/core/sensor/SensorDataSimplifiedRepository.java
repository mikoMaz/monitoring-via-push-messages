package com.example.monitoring.core.sensor;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;
@Repository
public interface SensorDataSimplifiedRepository  extends JpaRepository<SensorDataSimplified, String> {
 @Query(value = "SELECT * FROM sensor_data WHERE company_id = ?1 ORDER BY reading_time DESC LIMIT 1", nativeQuery = true)
 public SensorDataSimplified findLastReadingTime(Integer companyId);
 @Query(value = "SELECT COUNT(*) FROM (SELECT DISTINCT sensor FROM sensor_data  WHERE company_id=?1) as dt", nativeQuery = true)
 public Integer totalSensors(Integer companyId);
 @Query(value = "SELECT COUNT(*) FROM (SELECT DISTINCT sensor FROM sensor_data WHERE company_id=?1 AND reading_time>?2 ) as dt", nativeQuery = true)
 public Integer upSensors(Integer companyId,Long time);
 @Query(value = "\r\n" + //
          "SELECT *\r\n" + //
          "FROM\r\n" + //
          "\t(SELECT *,\r\n" + //
          "\t\t\tROW_NUMBER() OVER(PARTITION BY sensor \r\n" + //
          "\t\t\t\t\t\t\t\tORDER BY READING_TIME DESC)AS RN\r\n" + //
          "\t\tFROM SENSOR_DATA) T\r\n" + //
          "WHERE T.RN = 1 AND T.smartbox_identifier=?1", nativeQuery = true)
 public List<SensorDataSimplified> allSensorsConnectedToSmartbox(String smartboxIdentifier);
}