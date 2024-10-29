package com.example.monitoring.core.status;

import com.example.monitoring.core.alert.AlertData;
import java.util.List;

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
    @ManyToMany(mappedBy = "observedDevicesList")
    private List<AlertData> observingAlert;
    @ManyToMany(mappedBy = "ignoredDevicesList")
    private List<AlertData> ignoringAlert;
    private Long logged_at;
}
