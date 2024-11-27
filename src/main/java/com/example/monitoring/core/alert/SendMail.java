package com.example.monitoring.core.alert;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.apache.logging.slf4j.SLF4JLogger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.monitoring.core.api.DeviceDataService;
import com.example.monitoring.core.api.auth.AuthenticationService;
import com.example.monitoring.core.api.history.DeviceHistoryService;
import com.example.monitoring.core.external.DataHolderService;
import com.example.monitoring.core.status.DeviceStatusService;
import com.example.monitoring.core.status.DeviceStatusServiceImpl;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;

import lombok.RequiredArgsConstructor;
@Component
@RequiredArgsConstructor

public class SendMail  {
private static final org.slf4j.Logger log = LoggerFactory.getLogger(SendMail.class);
private final DeviceDataService deviceDataService;
private final DeviceHistoryService historyService;
private final DeviceStatusService statusService;
private final DataHolderService dataHolderService;
private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

@Scheduled(fixedRate = 60, timeUnit = TimeUnit.SECONDS)
public void checkDevicesInEveryCompany() {
    Set<String> companyIds=dataHolderService.getAllCompanyIds();
    for (String id : companyIds) {
        
        List<String> notWorkingDevicesList=IdsOfDevicesNotWorking(id).get(0);
        List<String> DevicesList=IdsOfDevicesNotWorking(id).get(1);
        log.info("Company id: {}",id);
        log.info("Devices that dont work count {}",notWorkingDevicesList.size());
        log.info("Full device count {}", DevicesList.size());
    }
    
    

}
public List<List<String>> IdsOfDevicesNotWorking(String companyId){
        List<String> devicesList;
        devicesList = dataHolderService.getAllChildrenForGivenCompanyId(companyId);
        List<String> notWorkingDevicesList=new ArrayList<String>();
        if(devicesList!=null)
        for(int i=0;i<devicesList.size();i++)
        {
            if(statusService.getCalculatedStatus(devicesList.get(i))!=null)
            if(statusService.getCalculatedStatus(devicesList.get(i))==0)
            {
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