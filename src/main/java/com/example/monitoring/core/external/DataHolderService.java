package com.example.monitoring.core.external;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class DataHolderService {

    @Autowired
    DataHolder externalData;

    /* device */
    private Map<String, List<String>> getDevice() {
        return externalData.getDeviceData();
    }

    public void addDeviceIfNotExist(String key) {
        getDevice().putIfAbsent(key, List.of("", ""));
    }

    public void addParentIdToDeviceData(String key, String parentId) {
        getDevice().put(key, List.of(parentId, getDevice().get(key).get(1)));
    }

    public void addCompanyIdToDeviceData(String key, String companyId) {
        getDevice().put(key, List.of(getDevice().get(key).getFirst(), companyId));
    }

    public String getParentIdFromDeviceData(String deviceId) {
        if (getDevice().containsKey(deviceId)) {
            return getDevice().get(deviceId).getFirst();
        }
        return null;
    }


    /* company */
    private Map<String, List<String>> getCompany() {
        return externalData.getCompanyData();
    }

    public void addCompanyIfNotExist(String key) {
        getCompany().putIfAbsent(key, new ArrayList<>());
    }

    public void addDeviceIdToCompanyData(String key, String deviceId) {
        if (!getCompany().get(key).contains(deviceId)) {
            getCompany().get(key).add(deviceId);
        }
    }
}
