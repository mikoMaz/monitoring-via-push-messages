package com.example.monitoring.core.bridge;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.monitoring.core.gateway.GatewayData;

@Service
@RequiredArgsConstructor
public class BridgeServiceImpl implements BridgeService {
    private final BridgeRepository repository;

    @Override
    public String saveSimplified(BridgeRequest request) {
        var gateway = BridgeData.builder()
                .logged_at(request.getLogged_at())
                .serial_number(request.getSerial_number())
                .last_seen(request.getLast_seen())
                .company_id(request.getCompany_id())
                .region(request.getRegion())
                .uptime(request.getUptime())
                .build(request.getBuild())
                .vpn_connected(request.getVpn_connected())
                .build();

        repository.save(gateway);
        return gateway.toString();
    }
    @Override
    public List<BridgeData> allBridges(Integer company_id) {
        return repository.allBridges(company_id);
    }
}
