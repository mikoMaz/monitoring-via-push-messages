package com.example.monitoring.core.status;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.example.monitoring.core.external.DataHolderService;


import lombok.RequiredArgsConstructor;
import lombok.val;
@Service
@RequiredArgsConstructor
public class DeviceStatusServiceImpl implements DeviceStatusService {
        private final DeviceStatusRepository repository;
        private final DataHolderService dataHolderService;
        private final Integer maxTimeout=60*5;

        public void saveFromArgs(String Id,Long Timestamp,Long firstLoggedAt){
                DeviceStatus ds=DeviceStatus.builder().Id(Id).logged_at(Timestamp).first_logged_at(firstLoggedAt).build();
                repository.save(ds);
        }
        public void saveToDatabase(DeviceStatus deviceStatus){
                repository.save(deviceStatus);
        }
        public Integer getCalculatedStatus(String Id,Long compareTime)
        {

                DeviceStatus ds=repository.getObjectById(Id);
                if(ds==null)
                return null;
                Long time=ds.getLogged_at();

                if(compareTime-time<maxTimeout){
                        return 1;
                }
                else return 0;
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
        public List<DeviceStatus> getOfflineDevices(String id){
                List<String> devicesToCheckIds=dataHolderService.getAllChildrenForGivenCompanyId(id);
                Long unixTime= System.currentTimeMillis() / 1000L;
                
                //TODO: make treshold a global variable 
                if(devicesToCheckIds!=null)
                {
                        return repository.findOfflineAndIdIn(devicesToCheckIds,unixTime,300L);
                }
                else return new ArrayList<DeviceStatus>();
                
        }

}
