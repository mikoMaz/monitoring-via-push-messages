package com.example.monitoring.core.external.fieldmapping;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeviceTypesServiceImpl implements DeviceTypesService {
    private final DeviceTypesRepository deviceTypesRepository;

    @Override
    public void addNewDeviceType(String deviceType) {
        DeviceTypes deviceTypes = new DeviceTypes();
        deviceTypes.setDeviceType(deviceType);
        deviceTypesRepository.save(deviceTypes);
    }
}
