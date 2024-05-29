package com.example.monitoring.core.sensor;
import org.hibernate.annotations.SecondaryRow;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.monitoring.core.api.auth.AuthenticationController;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
@Transactional
@RequiredArgsConstructor
@Service
public class SensorDataSimplifiedService {
    private final SensorDataSimplifiedRepository repository;
    org.slf4j.Logger  logger =LoggerFactory.getLogger(AuthenticationController.class);
    ObjectMapper objectMapper = new ObjectMapper();
    public ResponseEntity save(String objectJson){
         try {
        SensorData payload= objectMapper.readValue(objectJson, SensorData.class);
        SensorDataSimplified payloadSimplified= payload.toSensorDataSimplified();
        repository.save(payloadSimplified);
        return ResponseEntity.ok().body(payloadSimplified.toString());
        } catch (JsonMappingException e) {
        e.printStackTrace();
        return ResponseEntity.badRequest().body("err");
        } catch (JsonProcessingException e) {
        e.printStackTrace();
        return ResponseEntity.badRequest().body("err");
        }
    }
}
