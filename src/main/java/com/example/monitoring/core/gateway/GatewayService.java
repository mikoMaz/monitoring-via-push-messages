package com.example.monitoring.core.gateway;

import java.util.List;

import com.example.monitoring.core.bridge.BridgeData;

public interface GatewayService {
    String saveSimplified(GatewayRequest gatewayRequest);
    List<GatewayData> allGateways(Integer company_id) ;
}
