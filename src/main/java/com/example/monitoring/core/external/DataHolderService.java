package com.example.monitoring.core.external;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.monitoring.core.api.auth.AuthenticationController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DataHolderService {
    @Autowired
    DataHolder externalData;

    public void reset1(){
        externalData.getDeviceData().clear();
        

        externalData.getCompanyData().clear();
    }
    public void reset2(){
        Map<String, List<String>> mapka = externalData.getDeviceParent();
        mapka.clear();
        externalData.setDeviceParent(mapka);
        mapka=externalData.getDeviceChildren();
        mapka.clear();
        externalData.setDeviceChildren(mapka);

    }
    /* device */
    private Map<String, List<String>> getDeviceData() {
        return externalData.getDeviceData();
    }

    public void addDeviceIfNotExist(String key) {
        getDeviceData().putIfAbsent(key, List.of("", ""));
    }

    // public void addParentIdToDeviceData(String key, String parentId) {
    //     getDeviceData().put(key, List.of(parentId, getDeviceData().get(key).get(1)));
    // }

    public void addCompanyIdToDeviceData(String key, String companyId) {
        getDeviceData().put(key, List.of(getDeviceData().get(key).getFirst(), companyId));
    }

    public String getParentIdFromDeviceData(String deviceId) {
        if (getDeviceData().containsKey(deviceId)) {
            return getDeviceData().get(deviceId).getFirst();
        }
        return null;
    }
    /* device parent */
    public Map<String, List<String>> getDeviceParentData() {
        return externalData.getDeviceParent();
    }
    public void addDeviceChildIfNotExists(String key) {
        getDeviceParentData().putIfAbsent(key, new ArrayList<>());
    }
    
    public void addParentIdToDeviceParentData(String key, String parentId) {
        if (getDeviceParentData().containsKey(key)&& !getDeviceParentData().get(key).contains(parentId)) {
            getDeviceParentData().get(key).add(parentId);
        }

    }
    public List<String> getParentForGivenDeviceId(String deviceId) {
        return getDeviceParentData().get(deviceId);
    }
    
    /* device children */
    public Map<String, List<String>> getDeviceChildrenData() {
        return externalData.getDeviceChildren();
    }

    public void addDeviceParentIfNotExists(String key) {
        getDeviceChildrenData().putIfAbsent(key, new ArrayList<>());
    }

    public void addChildForGivenParentId(String parentId, String childId) {
        if (getDeviceChildrenData().containsKey(parentId) && !getDeviceChildrenData().get(parentId).contains(childId)) {
            getDeviceChildrenData().get(parentId).add(childId);
        }
    }

    public void deleteChildForGivenParentId(String parentId, String childId) {
        if (getDeviceChildrenData().containsKey(parentId)) {
            getDeviceChildrenData().get(parentId).remove(childId);
        }
    }

    public List<String> getAllChildrenForGivenDeviceId(String deviceId) {
        return getDeviceChildrenData().get(deviceId);
    }


    /* company */
    private Map<String, List<String>> getCompanyData() {
        return externalData.getCompanyData();
    }
    public List<String> getAllChildrenForGivenCompanyId(String companyId) {
        return getCompanyData().get(companyId);
    }


    public void addCompanyIfNotExist(String key) {
        getCompanyData().putIfAbsent(key, new ArrayList<>());
    }

    public void addDeviceIdToCompanyData(String key, String deviceId) {
        if (!getCompanyData().get(key).contains(deviceId)) {
            getCompanyData().get(key).add(deviceId);
        }
    }
}
