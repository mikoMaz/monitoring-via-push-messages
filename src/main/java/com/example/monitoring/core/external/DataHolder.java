package com.example.monitoring.core.external;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Component
public class DataHolder {
    private Map<String, List<String>> deviceData = new HashMap<>(); // {deviceId:[companyId], ...}
    private Map<String, List<String>> deviceParent = new HashMap<>(); // {deviceId:[parentId], ...}
    private Map<String, List<String>> deviceChildren = new HashMap<>(); // {deviceId:[childId, childId, ...], ...}
    private Map<String, List<String>> companyData = new HashMap<>(); // {companyId:[deviceId, deviceId, ...], ...}
}
