package com.example.monitoring.core.external.fieldmapping;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FieldMapDataServiceImpl implements FieldMapDataService {
    private final FieldMapDataRepository fieldMapDataRepository;
    private final DeviceTypesRepository deviceTypesRepository;

    @Override
    public void addFieldMapping(String fieldFromPayload, String fieldFromDatabase, String deviceType) {
        DeviceTypes deviceTypes = deviceTypesRepository.findByDeviceType(deviceType);

        if (deviceTypes != null) {
            FieldMapData fieldMapData = new FieldMapData();
            fieldMapData.setKeyName(fieldFromPayload);
            fieldMapData.setTableKeyName(fieldFromDatabase);
            fieldMapData.setDeviceTypes(deviceTypes);
            fieldMapDataRepository.save(fieldMapData);
        } else {
            throw new IllegalArgumentException("Device type not found: " + deviceType);
        }
    }

    @Override
    public Map<String, String> getAllFieldsForGivenDeviceType(String deviceType) {
        DeviceTypes deviceTypes = deviceTypesRepository.findByDeviceType(deviceType);

        if (deviceTypes != null) {
            Map<String, String> fields = new HashMap<>();
            fieldMapDataRepository.findByDeviceTypes(deviceTypes).forEach(fieldMapData -> {
                fields.put(fieldMapData.getKeyName(), fieldMapData.getTableKeyName());
            });
            return fields;
        } else {
            throw new IllegalArgumentException("Device type not found: " + deviceType);
        }
    }
}
