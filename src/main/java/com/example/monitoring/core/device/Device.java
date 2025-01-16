package com.example.monitoring.core.device;

import com.example.monitoring.core.company.Company;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Device {
    @Id
    private String id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "parent_device_id")
    private Device parentDevice;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;
}
