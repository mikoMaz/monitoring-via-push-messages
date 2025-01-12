package com.example.monitoring.core.external.fieldmapping;

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
@Table(name = "device_payload_fields")
public class FieldMapData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String keyName;
    private String tableKeyName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "deviceType", nullable = false)
    private DeviceTypes deviceTypes;
}
