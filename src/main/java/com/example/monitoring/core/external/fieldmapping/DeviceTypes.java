package com.example.monitoring.core.external.fieldmapping;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
@Entity
@Table(name = "device_types")
public class DeviceTypes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String deviceType;

    @OneToMany(mappedBy = "deviceTypes")
    private List<FieldMapData> fieldMapData;
}
