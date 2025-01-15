package com.example.monitoring.core.device;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeviceServiceImpl implements DeviceService {

    private final DeviceRepository deviceRepository;

    @Override
    public void deleteDevicesForGivenCompany(Long companyId) {
        deviceRepository.deleteDevicesByCompanyCompanyId(companyId);
    }
}
