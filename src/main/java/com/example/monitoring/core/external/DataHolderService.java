package com.example.monitoring.core.external;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class DataHolderService {

    @Autowired
    DataHolder externalData;

    /* device */
    public Map<String, List<String>> getDevice() {
        return externalData.getDeviceData();
    }

    public void addDeviceIfNotExist(String key) {
        externalData.newPlainDevice(key);
    }

    public void addParentIdToDeviceData(String key, String parentId) {
        externalData.addParentIdToDeviceData(key, parentId);
    }

    public void addCompanyIdToDeviceData(String key, String companyId) {
        externalData.addCompanyIdToDeviceData(key, companyId);
    }

    public String getParentIdFromDeviceData(String deviceId) {
        return externalData.getParentIdFromDeviceData(deviceId);
    }


    /* company */
    public Map<String, List<String>> getCompany() {
        return externalData.getCompanyData();
    }

    public void addCompanyIfNotExist(String key) {
        externalData.newPlainCompany(key);
    }

    public void addDeviceIdToCompanyData(String key, String deviceId) {
        externalData.addDeviceIdToCompanyData(key, deviceId);
    }
}
