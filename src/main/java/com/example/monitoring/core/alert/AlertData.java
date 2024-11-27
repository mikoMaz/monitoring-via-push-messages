package com.example.monitoring.core.alert;


import java.util.List;

import org.hibernate.annotations.NaturalId;

import com.example.monitoring.core.api.DeviceData;
import com.example.monitoring.core.external.fieldmapping.FieldMapData;
import com.example.monitoring.core.status.DeviceStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

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
    private String emailAdress;
    private Integer company_id;
    private Integer frequency; 
    private Integer duration;
    private Integer delay; 
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

     
}
