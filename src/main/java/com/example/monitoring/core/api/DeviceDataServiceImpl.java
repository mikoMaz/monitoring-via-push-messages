package com.example.monitoring.core.api;

import com.example.monitoring.core.external.fieldmapping.FieldMapDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DeviceDataServiceImpl implements DeviceDataService {
    private final FieldMapDataService fieldMapDataService;
    private final DeviceDataRepository deviceDataRepository;

    @Override
    public DeviceData buildObject(Map<String, Object> payload, String deviceType) {
        Map<String,String> fetchedData = fieldMapDataService.getAllFieldsForGivenDeviceType(deviceType);
        Map<String, String> map = new HashMap<>();
        List<List<String>> other = new ArrayList<>();

        payload.forEach((key, value) -> {
            if (fetchedData.containsKey(key)) {
                map.put(fetchedData.get(key), value.toString());
            } else {
                other.add(List.of(key, value.toString()));
            }
        });


        return DeviceData.builder()
                .deviceId(map.getOrDefault("device_id", null))
                .timestamp(map.get("timestamp") == null ? System.currentTimeMillis() / 1000 : Long.parseLong(map.get("timestamp")))
                .companyId(map.getOrDefault("company_id", null))
                .region(map.getOrDefault("region", null))
                .other(other.toString())
                .build();
    }

    @Override
    public void saveToDatabase(DeviceData builtPayload) {
        deviceDataRepository.save(builtPayload);
    }
}
