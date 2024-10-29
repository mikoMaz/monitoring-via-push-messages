package com.example.monitoring.core.status;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;


import lombok.RequiredArgsConstructor;
import lombok.val;
@Service
@RequiredArgsConstructor
public class DeviceStatusServiceImpl implements DeviceStatusService {
        private final DeviceStatusRepository repository;
        private final Integer maxTimeout=60*5;

        public void saveFromArgs(String Id,Long Timestamp){
                DeviceStatus ds=DeviceStatus.builder().Id(Id).logged_at(Timestamp).build();
                repository.save(ds);
        }
        public void saveToDatabase(DeviceStatus deviceStatus){
                repository.save(deviceStatus);
        }
        public Integer getCalculatedStatus(String Id)
        {

                DeviceStatus ds=repository.getObjectById(Id);
                Long time=ds.getLogged_at();
                Long unixTime = System.currentTimeMillis() / 1000L;

                if(unixTime-time<maxTimeout){
                        return 1;
                }
                else return 0;
        }
}
