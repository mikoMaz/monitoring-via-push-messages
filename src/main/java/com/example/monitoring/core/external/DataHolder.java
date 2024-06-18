package com.example.monitoring.core.external;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Setter
@Getter
@Component
public class DataHolder {
    private Map<String, List<String>> deviceData = new HashMap<>();
    private Map<String, List<String>> companyData = new HashMap<>();

    /* device */
    public void newPlainDevice(String key) {
        deviceData.putIfAbsent(key, List.of("", ""));
    }

    public void addParentIdToDeviceData(String key, String parentId) {
        deviceData.put(key, List.of(parentId, deviceData.get(key).get(1)));
    }

    public void addCompanyIdToDeviceData(String key, String companyId) {
        deviceData.put(key, List.of(deviceData.get(key).getFirst(), companyId));
    }

    public String getParentIdFromDeviceData(String deviceId) {
        if (deviceData.containsKey(deviceId)) {
            return deviceData.get(deviceId).getFirst();
        }
        return null;
    }


    /* company */
    public void newPlainCompany(String key) {
        companyData.putIfAbsent(key, new ArrayList<>());
    }

    public void addDeviceIdToCompanyData(String key, String deviceId) {
        if (!companyData.get(key).contains(deviceId)) {
            companyData.get(key).add(deviceId);
        }
    }
}
