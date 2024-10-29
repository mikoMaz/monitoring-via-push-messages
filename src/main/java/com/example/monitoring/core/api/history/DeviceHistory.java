
package com.example.monitoring.core.api.history;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table(name = "deviceHistory")
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeviceHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long Id;
    private String deviceId;
    private Long start_timestamp;
    private Long end_timestamp;
    private Long length;
}