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

        public void saveFromArgs(String Id,Long Timestamp,Long firstLoggedAt){
                DeviceStatus ds=DeviceStatus.builder().Id(Id).logged_at(Timestamp).first_logged_at(firstLoggedAt).build();
                repository.save(ds);
        }
        public Integer getCalculatedStatus(String Id)
        {

                DeviceStatus ds=repository.getObjectById(Id);
                if(ds==null)
                return null;
                Long time=ds.getLogged_at();
                Long unixTime = System.currentTimeMillis() / 1000L;

                if(unixTime-time<maxTimeout){
                        return 1;
                }
                else return 0;
        }
        public Integer getCalculatedStatus(DeviceStatus ds)
        {
                Long time=ds.getLogged_at();
                Long unixTime = System.currentTimeMillis() / 1000L;

                if(unixTime-time<maxTimeout){
                        return 1;
                }
                else return 0;
        }
        public     DeviceStatus getDeviceStatus(String Id)
        {               
                return  repository.getObjectById(Id);
        }

}
