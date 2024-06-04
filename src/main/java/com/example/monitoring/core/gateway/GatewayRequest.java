package com.example.monitoring.core.gateway;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GatewayRequest {
    private String logged_at;
    private String gateway_eui;
    private String last_seen;
    private String bridge_serial_number;
    private String type;
    private String mode;
    private String install_status;
    private String firmware_version;
}
