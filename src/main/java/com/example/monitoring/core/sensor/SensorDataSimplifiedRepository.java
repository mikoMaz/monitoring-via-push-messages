package com.example.monitoring.core.sensor;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.NoArgsConstructor;

import java.util.Optional;
import java.util.function.Function;
@Repository
public interface SensorDataSimplifiedRepository  extends JpaRepository<SensorDataSimplified, String> {
 @Query(value = "SELECT * FROM sensor_data WHERE reading_time =(SELECT MAX(reading_time)FROM sensor_data WHERE company_id=?1)", nativeQuery = true)
 public SensorDataSimplified findLastReadingTime(Integer company_id);
 @Query(value = "SELECT COUNT(*) FROM (SELECT DISTINCT sensor FROM sensor_data  WHERE company_id=?1) as dt", nativeQuery = true)
 public Integer totalSensors(Integer company_id);
 @Query(value = "SELECT COUNT(*) FROM (SELECT DISTINCT sensor FROM sensor_data WHERE company_id=?1 AND reading_time>?2 ) as dt", nativeQuery = true)
 public Integer upSensors(Integer company_id,Long time);
}