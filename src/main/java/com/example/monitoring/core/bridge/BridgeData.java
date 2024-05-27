package com.example.monitoring.core.bridge;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//@Entity
//@Data
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "bridgeData")
public class BridgeData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long Id;
    private String logged_at;
    private String serial_number;
    private String last_seen;
    private String company_id;
    private String region;
    private String uptime;
    private String build;
    private String vpn_connected;
}
