package com.example.monitoring.core.device;

import com.example.monitoring.core.company.Company;
import com.example.monitoring.core.company.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DeviceServiceImpl implements DeviceService {

    private final DeviceRepository deviceRepository;

    private final CompanyService companyService;

    @Override
    @Transactional
    public void deleteDevicesForGivenCompany(Long companyId) {
        deviceRepository.deleteDevicesByCompanyCompanyId(companyId);
    }

    @Override
    public void addNewDeviceWithDetails(String deviceId, String parentId, Long companyId) {
        Optional<Company> company = companyService.findCompanyById(companyId);

        if (company.isEmpty()) {
            throw new IllegalArgumentException("Company not found");
        }

        Device device = new Device();
        device.setId(deviceId);
        device.setCompany(company.get());

        if (parentId != null) {
            Optional<Device> parentDevice = deviceRepository.findById(parentId);
            parentDevice.ifPresent(device::setParentDevice);
        } else {
            device.setParentDevice(null);
        }

        deviceRepository.save(device);
    }

    @Override
    public void addCompanyToDevice(String deviceId, Long companyId) {
        Optional<Company> company = companyService.findCompanyById(companyId);

        if (company.isEmpty()) {
            throw new RuntimeException("Company not found"); // TODO! change to custom exception
        }

        Company companyToAdd = company.get();

        Optional<Device> device = deviceRepository.findById(deviceId);

        if (device.isEmpty()) {
            throw new RuntimeException("Device not found"); // TODO! again
        }

        device.get().setCompany(companyToAdd);

        deviceRepository.save(device.get());
    }

    @Override
    public void detachParentForDevicesByCompanyId(Long companyId) {
        List<Device> devices = deviceRepository.findAll();

        devices.forEach(device -> {
            device.setParentDevice(null);
        });

        deviceRepository.saveAll(devices);
    }

    @Override
    public void addParentIdToDevice(String deviceId, String parentId) {
        Optional<Device> device = deviceRepository.findById(deviceId);
        Optional<Device> parentDevice = deviceRepository.findById(parentId);

        if (device.isEmpty() || parentDevice.isEmpty()) {
            // TODO!
        }

        device.get().setParentDevice(parentDevice.get());
        deviceRepository.save(device.get());
    }
}
