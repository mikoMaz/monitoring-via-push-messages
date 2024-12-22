package com.example.monitoring.core.alert;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Logger;

import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.monitoring.core.api.DeviceData;
import com.example.monitoring.core.api.DeviceDataRepository;
import com.example.monitoring.core.external.DataHolderService;
import com.example.monitoring.core.sensor.SensorData;
import com.example.monitoring.core.status.DeviceStatus;
import com.example.monitoring.core.status.DeviceStatusService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AlertServiceImpl implements AlertService {
    private final AlertRepository alertRepository;
    private final DeviceStatusService statusService;
    private static final org.slf4j.Logger log = LoggerFactory.getLogger(AlertServiceImpl.class);
private final DataHolderService dataHolderService;
    @Override
    public AlertData buildObject(String objectJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        AlertData alertData = new AlertData();
        try{
        alertData = objectMapper.readValue(objectJson, AlertData.class);
        log.info(objectJson);
        log.info(alertData.getIgnore().toString());
        } catch (JsonMappingException e) {
        e.printStackTrace();
        } catch (JsonProcessingException e) {
        e.printStackTrace();
        }
        return alertData;
        
    }
    public ArrayList<AlertData> getAlertsForCompany(String companyId)
    {
        return alertRepository.findAllByCompanyId(companyId);
    }
    public ArrayList<AlertData> getAlertsForDevice(String deviceId)
    {
        return alertRepository.findAllObservingDevice(deviceId);
    }
    public void getDevicesThatGiveAlert(String companyId){
        Set<String> companyIds=dataHolderService.getAllCompanyIds();
        if(companyIds!=null)
        for (String id : companyIds) {
        log.info("Company id: {}",id);
        List<AlertData> alerts = this.getAlertsForCompany(id);

        if(alerts!=null)
        for(AlertData alert : alerts)
        {
            log.info("Alert id: {}",alert.getId() );
            if(!alert.getIgnore())
            {
                List<DeviceStatus>observedList=alert.getObservedDevicesList();
                List<String>observedListIds = new ArrayList<String>();
                for(DeviceStatus status:observedList){
                    observedListIds.add(status.getId());
                }
                List<DeviceStatus>ignoredList=alert.getIgnoredDevicesList();
                List<String>ignoredListIds = new ArrayList<String>();
                for(DeviceStatus status:ignoredList){
                    ignoredListIds.add(status.getId());
                }
                
                log.info("I am checking those devices : {}",observedListIds);
                log.info("And ignore those: {}",ignoredListIds);
                for(DeviceStatus ignoredDevice : ignoredList)
                {
                    if(observedList.contains(ignoredDevice))
                    {
                        log.info("I dont want to check this device: {}",ignoredDevice.getId());
                        observedList.remove(ignoredDevice);

                    }
                }
                observedListIds = new ArrayList<String>();
                for(DeviceStatus status:observedList){
                    observedListIds.add(status.getId());
                }
                log.info("Finally I am checking those : {}",observedListIds);

                for(int i=0;i<observedList.size();i++)
                {
                    if(statusService.getCalculatedStatus(observedList.get(i))==0)
                    {
                        log.info("this device doesnt work : {}",observedList.get(i).getId());
                    } 
                    else
                    log.info("this device does work : {}",observedList.get(i).getId());
                }
            }

        }

    }
    }   
    public void saveToDatabase(AlertData alertData){
        alertRepository.save(alertData);
       }
    public void saveToDatabase(String objectJson){
    AlertData alertData=buildObject(objectJson);
    alertRepository.save(alertData);
    }
    public void deleteById(String id)
    {
        alertRepository.deleteById(id);
    }
    public  void setAlertIgnoreState(String alertId,boolean stateValue){
        AlertData alert = alertRepository.findById(alertId).orElse(null);
        if (alert!=null)
        alert.setIgnore(stateValue);

    }

}

