package com.example.monitoring.core.bridge;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BridgeRequest {
    private String logged_at;
    private String serial_number;
    private String last_seen;
    private String company_id;
    private String region;
    private String uptime;
    private String build;
    private String vpn_connected;
}
