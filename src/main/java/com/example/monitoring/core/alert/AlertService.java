package com.example.monitoring.core.alert;

import java.util.ArrayList;

public interface AlertService {
    void saveToDatabase(AlertData alertData);

    void saveToDatabase(String objectJson);

    AlertData buildObject(String objectJson);

    void deleteById(String id);

    ArrayList<AlertData> getAlertsForCompany(Long companyId);

    ArrayList<AlertData> getAlertsForDevice(String deviceId);

    void setAlertIgnoreState(String alertId, boolean stateValue);

    void getDevicesThatGiveAlert(Long companyId);

    void addNewAlert(String payload);
}
