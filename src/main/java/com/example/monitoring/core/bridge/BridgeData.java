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
    private Long logged_at;
    private String serial_number;
    private String last_seen;
    private Integer company_id;
    private String region;
    private String uptime;
    private String build;
    private String vpn_connected;
    @Override
    public String toString() {
        return "{" +
            " Id='" + getId() + "'" +
            ", logged_at='" + getLogged_at() + "'" +
            ", serial_number='" + getSerial_number() + "'" +
            ", last_seen='" + getLast_seen() + "'" +
            ", company_id='" + getCompany_id() + "'" +
            ", region='" + getRegion() + "'" +
            ", uptime='" + getUptime() + "'" +
            ", build='" + getBuild() + "'" +
            ", vpn_connected='" + getVpn_connected() + "'" +
            "}";
    }

}
