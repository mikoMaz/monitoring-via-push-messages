package com.example.monitoring.core.external.fieldmapping;

import java.util.Map;

public interface FieldMapDataService {
    void addFieldMapping(String fieldFromPayload, String fieldFromDatabase, String deviceType);
    Map<String, String> getAllFieldsForGivenDeviceType(String deviceType);
}
