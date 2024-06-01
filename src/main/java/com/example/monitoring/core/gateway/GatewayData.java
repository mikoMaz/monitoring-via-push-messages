package com.example.monitoring.core.gateway;

import com.example.monitoring.core.sensor.SensorMessage;
import com.example.monitoring.core.sensor.SensorProperties;
import jakarta.persistence.*;
import lombok.*;

//@Entity
//@Data
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "gatewayData")
public class GatewayData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long Id;
    private String logged_at;
    private String gateway_eui;
    private String last_seen;
    private String bridge_serial_number;
    private String type;
    private String mode;
    private String install_status;
    private String firmware_version;

      //TODO: make it return real value
      public Integer getStatus(){
        return 1;
    }
}
