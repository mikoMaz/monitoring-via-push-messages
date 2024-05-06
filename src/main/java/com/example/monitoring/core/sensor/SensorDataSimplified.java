package com.example.monitoring.core.sensor;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Collection;
import java.util.List;
@Entity
@Data
@Table(name = "sensorData")
public class SensorDataSimplified {
    @Id
    private long Id;
    private String sensor;
    private String company_id;
    private String data_type;
    private String reading_time;

    public SensorDataSimplified(String sensor, String company_id, String data_type, String reading_time) {
        this.sensor = sensor;
        this.company_id = company_id;
        this.data_type = data_type;
        this.reading_time = reading_time;
    }

    @Override
    public String toString() {
        return "{" +
            " sensor='" + getSensor() + "'" +
            ", company_id='" + getCompany_id() + "'" +
            ", data_type='" + getData_type() + "'" +
            ", reading_time='" + getReading_time() + "'" +
            "}";
    }

}
