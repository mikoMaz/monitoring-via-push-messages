package com.example.monitoring.core.alert;


import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;

import com.example.monitoring.core.status.DeviceStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

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
@Table(name = "alert_data")
public class AlertData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;
    private String emailAdress; // TODO: if null then its default to company mail adress
    private String companyId;
    private Integer frequency; // as notification per X seconds
    private Integer duration; // how many times

    @ColumnDefault("0")
    private Integer delay;  // in seconds; notify after standard time + delay > downtime

    @ColumnDefault("false") // FIXME: doesnt work :/
    @JsonProperty("ignore")
    private Boolean ignore;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
    name = "alert_ignore_device", 
    joinColumns = @JoinColumn(name = "alert_id"), 
    inverseJoinColumns = @JoinColumn(name = "device_id"))
    private List<DeviceStatus> ignoredDevicesList;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
    name = "alert_observe_device", 
    joinColumns = @JoinColumn(name = "alert_id"), 
    inverseJoinColumns = @JoinColumn(name = "device_id"))

    private List<DeviceStatus> observedDevicesList;

    public List<DeviceStatus>getObservedDevicesList(){
        if (this.ignoredDevicesList!=null)
        return this.ignoredDevicesList;
        else return new ArrayList<DeviceStatus>();
    }

    public List<DeviceStatus>getIgnoredDevicesList(){
        if (this.observedDevicesList!=null)
        return observedDevicesList;
        else return new ArrayList<DeviceStatus>();
    }
}
