package com.example.monitoring.core.sensor;
import org.hibernate.annotations.SecondaryRow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
@Transactional
@RequiredArgsConstructor
@Service
public class SensorDataSimplifiedService {
    private final SensorDataSimplifiedRepository repository;

    public void save(SensorDataSimplified object){
        repository.save(object);
        return;
    }
}

