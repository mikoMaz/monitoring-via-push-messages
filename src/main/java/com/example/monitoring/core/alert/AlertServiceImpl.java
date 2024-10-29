package com.example.monitoring.core.alert;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.monitoring.core.api.DeviceData;
import com.example.monitoring.core.api.DeviceDataRepository;
import com.example.monitoring.core.sensor.SensorData;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AlertServiceImpl implements AlertService {
    private final AlertRepository alertRepository;
    
    @Override
    public AlertData buildObject(String objectJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        AlertData alertData = new AlertData();
        try{
        alertData = objectMapper.readValue(objectJson, AlertData.class);
    

        } catch (JsonMappingException e) {
        e.printStackTrace();
        } catch (JsonProcessingException e) {
        e.printStackTrace();
        }
        return alertData;
        
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

}

