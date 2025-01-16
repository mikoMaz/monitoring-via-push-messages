package com.example.monitoring.core.alert;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import com.example.monitoring.core.company.CompanyDto;
import com.example.monitoring.core.company.CompanyService;
import com.example.monitoring.core.device.DeviceService;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.monitoring.core.api.DeviceDataService;
import com.example.monitoring.core.api.history.DeviceHistoryService;
import com.example.monitoring.core.external.DataHolderService;
import com.example.monitoring.core.status.DeviceStatus;
import com.example.monitoring.core.status.DeviceStatusService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor

public class SendAlert {
    private static final org.slf4j.Logger log = LoggerFactory.getLogger(SendAlert.class);
    private final DeviceDataService deviceDataService;
    private final DeviceHistoryService historyService;
    private final DeviceStatusService statusService;
//    private final DataHolderService dataHolderService;
    private final DeviceService deviceService;
    private final CompanyService companyService;
    private final AlertService alertService;
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
    private static Map<String, List<ActiveAlert>> activeAlertsList = new HashMap();
    private Integer counter = 0;

    void removeInactiveAlert(Integer alertKey, String deviceId) {

        for (int i = this.activeAlertsList.get(deviceId).size() - 1; i > 0; i--) {
            if (alertKey == this.activeAlertsList.get(deviceId).get(i).getKey())
                this.activeAlertsList.get(deviceId).remove(i);
        }
    }

    @Scheduled(fixedRate = 5, timeUnit = TimeUnit.SECONDS)
    public void checkDevicesInEveryCompany() {

        Set<Long> companyIds = companyService.getAllCompanies().stream().map(
                CompanyDto::getCompanyId
        ).collect(Collectors.toSet());

        if (companyIds != null)
            for (Long id : companyIds) {
                // get devices that dont work
                List<String> deviceIds = statusService.getOfflineDevices(id).stream()
                        .map(DeviceStatus::getId)
                        .toList();
                for (String deviceId : deviceIds) {
                    // get alerts connected to that devices
                    String parentId = deviceService.getParentIdFromDevice(deviceId);
                    if (parentId != null) {
                        if (statusService.getCalculatedStatus(parentId) == null
                                || statusService.getCalculatedStatus(parentId) == 0) // if parent is inactive dont make
                                                                                     // alert for its children
                            break;
                    }
                    ArrayList<AlertData> alertDataList = alertService.getAlertsForDevice(deviceId);
                    List<ActiveAlert> currentAlerts = this.activeAlertsList.get(deviceId);
                    if (currentAlerts == null)
                        currentAlerts = new ArrayList<ActiveAlert>();
                    if (this.activeAlertsList.containsKey("1"))
                        log.info("active alerts size {}", this.activeAlertsList.get("1").size());
                    log.info("size {}", currentAlerts.size());
                    log.info("counter {}", this.counter);
                    this.counter += 1;
                    for (AlertData ad : alertDataList) {
                        if (ad.getIgnore() == false) {
                            boolean doesExist = false;
                            for (ActiveAlert value : currentAlerts) {
                                if (value.getId() == ad.getId())
                                    doesExist = true;
                                log.info("valueId :{}", value.getId());
                                break;
                            }
                            if (!doesExist) {
                                log.info("adding new Active alert YAY!");
                                currentAlerts.add(new ActiveAlert(ad, deviceId, this));
                                if (this.activeAlertsList.putIfAbsent(deviceId, currentAlerts) != null)
                                    this.activeAlertsList.replace(deviceId, currentAlerts);
                            }

                        }
                    }
                }

            }
    }

    public void stopAlert(String alertId) {
        List<ActiveAlert> listOfAlertsToShutDown = new ArrayList();
        log.info("active alerts length:{}", activeAlertsList.size());
        log.info("{}", activeAlertsList.values().stream().flatMap(List<ActiveAlert>::stream)
                .collect(Collectors.toList()).getFirst().getId());
        listOfAlertsToShutDown = this.activeAlertsList.values().stream()
                .flatMap(List<ActiveAlert>::stream)
                .filter(alert -> alert.getId() == Long.parseLong(alertId))
                .collect(Collectors.toList());
        log.info("Trying to shut {} alert(s)", listOfAlertsToShutDown.size());
        for (ActiveAlert alert : listOfAlertsToShutDown) {
            alert.shutDown();
        }
    }

    public List<List<String>> IdsOfDevicesNotWorking(Long companyId) {
        List<String> devicesList;
        devicesList = deviceService.getAllChildrenForGivenCompanyId(companyId);
        List<String> notWorkingDevicesList = new ArrayList<String>();
        if (devicesList != null)
            for (int i = 0; i < devicesList.size(); i++) {
                if (statusService.getCalculatedStatus(devicesList.get(i)) == null
                        || statusService.getCalculatedStatus(devicesList.get(i)) == 0) {
                    notWorkingDevicesList.add(devicesList.get(i));
                }
            }

        else
            devicesList = notWorkingDevicesList;
        List<List<String>> finalList = new ArrayList<List<String>>();
        finalList.add(notWorkingDevicesList);
        finalList.add(devicesList);
        return finalList;

    }
}
