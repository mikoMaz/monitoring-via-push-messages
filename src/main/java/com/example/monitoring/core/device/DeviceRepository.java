package com.example.monitoring.core.device;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceRepository extends JpaRepository<Device, String> {

    void deleteDevicesByCompanyCompanyId(Long id);

    @Query("SELECT d.id FROM Device d WHERE d.company.companyId = :companyId AND d.parentDevice IS NOT NULL")
    List<String> findDeviceIdsByCompanyIdWithParent(@Param("companyId") Long companyId);

    List<Device> findDevicesByParentDeviceId(String parentDevice);
}
