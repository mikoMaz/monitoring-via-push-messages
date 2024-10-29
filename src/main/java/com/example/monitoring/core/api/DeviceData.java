package com.example.monitoring.core.api;

import com.example.monitoring.core.alert.AlertData;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "device_data")
public class DeviceData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String deviceId;
    private Long timestamp;
    private String companyId;
    private String region;
    private String other;
}
