package com.example.monitoring.core.gateway;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GatewayServiceImpl implements GatewayService {
    private final GatewayRepository repository;

    @Override
    public String saveSimplified(GatewayRequest request) {
        var gateway = GatewayData.builder()
                .logged_at(request.getLogged_at())
                .gateway_eui(request.getGateway_eui())
                .last_seen(request.getLast_seen())
                .bridge_serial_number(request.getBridge_serial_number())
                .type(request.getType())
                .mode(request.getMode())
                .install_status(request.getInstall_status())
                .firmware_version(request.getFirmware_version())
                .build();

        repository.save(gateway);
        return gateway.toString();
    }
}
