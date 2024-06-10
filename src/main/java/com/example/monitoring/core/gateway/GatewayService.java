package com.example.monitoring.core.gateway;

import java.util.List;

import com.example.monitoring.core.bridge.BridgeData;

public interface GatewayService {
    GatewayData saveSimplified(GatewayRequest gatewayRequest);
    List<GatewayData> allGatewaysConnectedToBridge(String serialNumber) ;
    
}
