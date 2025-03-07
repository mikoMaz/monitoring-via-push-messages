package com.example.monitoring;

import com.example.monitoring.core.api.DevicesModelService;
import com.example.monitoring.core.api.JsonTreeConverter;
import com.example.monitoring.core.api.history.DeviceHistoryRepository;
import com.example.monitoring.core.api.history.DeviceHistoryService;
import com.example.monitoring.core.api.history.DeviceHistoryServiceImpl;
import com.example.monitoring.core.company.Company;
import com.example.monitoring.core.company.CompanyDto;
import com.example.monitoring.core.company.CompanyRepository;
import com.example.monitoring.core.company.CompanyServiceImpl;
import com.example.monitoring.core.device.DeviceService;
import com.example.monitoring.core.status.DeviceStatusService;
import com.example.monitoring.core.user.Role;
import com.example.monitoring.core.user.UserDto;
import com.example.monitoring.core.user.UserService;
import com.example.monitoring.core.user.exceptions.AccessDeniedException;
import com.google.gson.JsonArray;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.lang.foreign.SymbolLookup;
import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.refEq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class DeviceModelServiceTest {

    @Mock
    private DeviceHistoryService historyService;
    @Mock
    private DeviceStatusService statusService;
    @Mock
    private DeviceService deviceService;
    @Mock
    private JsonTreeConverter proc;
    @Mock
    private UserService userService;

    @InjectMocks
    private DevicesModelService deviceModelService;

    @DisplayName("deviceModelService getStatsByPeriod test")
    @Test
    void test_deviceModelServicegetStatsByPeriod() {
        // Arrange
        Long companyId = 0L;
        List<String> deviceIds = Arrays.asList("Child0", "Child1");
        Map<String, List<Double>> companyUptimes = new HashMap<String, List<Double>>();
        companyUptimes.put("0", Arrays.asList(1D, 2D));
        companyUptimes.put("1", Arrays.asList(10D, 20D));
        Long StartTimeStamp = 0L;
        Long StopTimeStamp = 0L;
        Long chosenMode = 86400L;
        // when(deviceModelService.getStatsByPeriod(0L, 0L, 0L, "day")).thenReturn(new
        // JsonArray());
        when(deviceService.getAllChildrenForGivenCompanyId(companyId))
                .thenReturn(deviceIds);
        when(historyService.uptimePercentByPeriod(deviceIds, StartTimeStamp,
                StopTimeStamp, chosenMode)).thenReturn(companyUptimes);

        // Act
        JsonArray result = deviceModelService.getStatsByPeriod(0L, 0L, 0L, "day");

        // Assert
        System.out.println("Taki wychodzi JSON:");
        System.out.println(result);
        result = deviceModelService.getStatsByPeriodMean(0L, 0L, 0L, "day");
        System.out.println("A taki jak weźmiemy średnie");
        System.out.println(result);
    }

    @DisplayName("deviceModelService deviceIncident test")
    @Test
    void test_deviceModelServiceDeviceIncident() {
        // Arrange
        List<String> deviceIds = Arrays.asList("Child0", "Child1");
        when(deviceService.getAllChildrenForGivenCompanyId(0L))
                .thenReturn(deviceIds);
        Map<String, List<Map.Entry<Long, Long>>> incidentMap = new HashMap<>();
        incidentMap.put("Child0", Arrays.asList(new AbstractMap.SimpleEntry(0L, 100L)));
        incidentMap.put("Child1", Arrays.asList(new AbstractMap.SimpleEntry(0L, 200L)));
        incidentMap.put("Child1", Arrays.asList(new AbstractMap.SimpleEntry(220L, 320L)));
        when(historyService.deviceIncidentList(deviceIds, 0L, 1000L)).thenReturn(incidentMap);

        // Act
        JsonArray result = deviceModelService.getIncidents(0L, 0L, 1000L);
        System.out.println(result);
        // Assert

    }

}