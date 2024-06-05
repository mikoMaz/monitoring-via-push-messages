package com.example.monitoring.core.status;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.monitoring.core.bridge.BridgeData;
import com.example.monitoring.core.bridge.BridgeRepository;
import com.example.monitoring.core.bridge.BridgeRequest;

import lombok.RequiredArgsConstructor;

public interface DeviceStatusService {
    void saveFromArgs(String Id,Long Timestamp);
    Integer getStatus(String Id);
}
