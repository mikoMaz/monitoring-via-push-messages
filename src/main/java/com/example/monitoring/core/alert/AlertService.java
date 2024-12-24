package com.example.monitoring.core.alert;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.monitoring.core.api.DeviceData;

public interface AlertService {
    void saveToDatabase(AlertData alertData);
    void saveToDatabase(String objectJson);
    AlertData buildObject(String objectJson);
    void deleteById(String id);
    ArrayList<AlertData> getAlertsForCompany(String companyId);
    ArrayList<AlertData> getAlertsForDevice(String deviceId);
    void setAlertIgnoreState(String alertId,boolean stateValue);
    void getDevicesThatGiveAlert(String companyId);
    void addNewAlert(String payload);

}
