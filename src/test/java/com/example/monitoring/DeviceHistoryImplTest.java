
package com.example.monitoring;

import com.example.monitoring.core.api.DevicesModelService;
import com.example.monitoring.core.api.JsonTreeConverter;
import com.example.monitoring.core.api.history.DeviceHistory;
import com.example.monitoring.core.api.history.DeviceHistoryRepository;
import com.example.monitoring.core.api.history.DeviceHistoryService;
import com.example.monitoring.core.api.history.DeviceHistoryServiceImpl;
import com.example.monitoring.core.company.Company;
import com.example.monitoring.core.company.CompanyDto;
import com.example.monitoring.core.company.CompanyRepository;
import com.example.monitoring.core.company.CompanyServiceImpl;
import com.example.monitoring.core.device.DeviceService;
import com.example.monitoring.core.external.DataHolderService;
import com.example.monitoring.core.status.DeviceStatusRepository;
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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class DeviceHistoryImplTest {

    @Mock
    private DeviceHistoryRepository repository;
    @Mock
    private DeviceStatusRepository statusRepository;

    @InjectMocks
    private DeviceHistoryServiceImpl deviceHistoryService;

    @DisplayName("deviceHistoryService deviceIncident test")
    @Test
    void test_deviceHistoryServiceDeviceIncident() {
        // Arrange
        List<String> deviceIds = Arrays.asList("Child0", "Child1", "MrPerfect");
        // Long companyId = 0L;
        // List<String> deviceIds = Arrays.asList("Child0", "Child1");
        // Map<String, List<Double>> companyUptimes = new HashMap<String,
        // List<Double>>();
        // companyUptimes.put("0", Arrays.asList(1D, 2D));
        // companyUptimes.put("1", Arrays.asList(10D, 20D));
        // Long StartTimeStamp = 0L;
        // Long StopTimeStamp = 0L;
        // Long chosenMode = 86400L;
        // when(deviceService.getAllChildrenForGivenCompanyId(companyId))
        // .thenReturn(deviceIds);
        // when(historyService.uptimePercentByPeriod(deviceIds, StartTimeStamp,
        // StopTimeStamp, chosenMode)).thenReturn(companyUptimes);
        when(repository.timeStampsFromPeriod(deviceIds, 0L, 10000L)).thenReturn(Arrays.asList(
                new DeviceHistory().builder()
                        .deviceId("Child0").start_timestamp(101L).end_timestamp(2001L).Id(0).build(),
                new DeviceHistory().builder()
                        .deviceId("Child1").start_timestamp(303L).end_timestamp(2003L).Id(1).build()));

        // Act
        Map<String, List<Map.Entry<Long, Long>>> result = deviceHistoryService.deviceIncidentList(deviceIds, 0L,
                10000L);

        // Assert
        // System.out.println("Taki wychodzi JSON:");
        System.out.println(result.get("Child1").toString());
        System.out.println(result);
        // result = deviceModelService.getStatsByPeriodMean(0L, 0L, 0L, "day");
        // System.out.println("A taki jak weźmiemy średnie");
        // System.out.println(result);
    }

}
