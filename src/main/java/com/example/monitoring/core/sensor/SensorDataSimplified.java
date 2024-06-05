package com.example.monitoring.core.sensor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
@Entity
@Data
@Table(name = "sensorData")
public class SensorDataSimplified {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long Id;
    private String sensor;
    private Integer company_id;
    private String data_type;
    private Long reading_time;
    private String smartbox_identifier;
    public SensorDataSimplified()
    {

    }

    public SensorDataSimplified(String sensor, String company_id, String data_type, String reading_time,String smartbox_identifier) {
        this.sensor = sensor;
        this.company_id = Integer.parseInt(company_id);
        this.data_type = data_type;
        this.reading_time = Long.parseLong(reading_time);
        this.smartbox_identifier=smartbox_identifier;
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
