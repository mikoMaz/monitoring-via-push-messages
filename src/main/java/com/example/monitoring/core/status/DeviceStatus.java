package com.example.monitoring.core.status;

import com.example.monitoring.core.alert.AlertData;

import java.util.ArrayList;
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
    @Column(name="device_id")
    private String Id;
    @ManyToMany(mappedBy = "observedDevicesList")
    private List<AlertData> observingAlert;
    @ManyToMany(mappedBy = "ignoredDevicesList")
    private List<AlertData> ignoringAlert;
    private Long logged_at;
    private Long first_logged_at;

    public List<AlertData>getIgnoringAlert(){
        if (this.ignoringAlert!=null)
        return this.ignoringAlert;
        else return new ArrayList<AlertData>();
    }
    public List<AlertData>getIgnoredDevicesList(){
        if (this.observingAlert!=null)
        return this.observingAlert;
        else return new ArrayList<AlertData>();
    }
}
