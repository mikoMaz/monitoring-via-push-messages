package com.example.monitoring.core.status;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table(name = "deviceStatus")
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeviceStatus {
    @Id
    private String Id;
    private Long logged_at;
}
