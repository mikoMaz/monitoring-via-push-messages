package com.example.monitoring.core.bridge;

import java.util.List;

public interface BridgeService {
    BridgeData saveSimplified(BridgeRequest gatewayRequest);
    List<BridgeData> allBridges(Integer company_id) ;
}
