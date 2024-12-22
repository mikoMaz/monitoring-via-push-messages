package com.example.monitoring.core.api;

import lombok.RequiredArgsConstructor;
import net.bytebuddy.implementation.bytecode.constant.IntegerConstant;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.aspectj.weaver.tools.Trace;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.monitoring.core.bridge.BridgeData;
import com.example.monitoring.core.bridge.BridgeService;
import com.example.monitoring.core.external.DataHolderService;
import com.example.monitoring.core.gateway.GatewayData;
import com.example.monitoring.core.gateway.GatewayService;
import com.example.monitoring.core.sensor.SensorDataSimplified;
import com.example.monitoring.core.sensor.SensorDataSimplifiedService;
import com.example.monitoring.core.status.DeviceStatus;
import com.example.monitoring.core.status.DeviceStatusService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.example.monitoring.core.api.WebWritePreprocessor;
import com.example.monitoring.core.api.auth.AuthenticationController;
import com.example.monitoring.core.api.history.DeviceHistory;
import com.example.monitoring.core.api.history.DeviceHistoryService;
import com.google.gson.*;
@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class WebWriteController {
    private final DeviceDataService deviceDataService;
    private final DeviceHistoryService historyService;
    private final DeviceStatusService statusService;
    private final DataHolderService dataHolderService;
    private final WebWritePreprocessor proc;

    org.slf4j.Logger  logger =LoggerFactory.getLogger(AuthenticationController.class);
    ObjectMapper objectMapper = new ObjectMapper();
    ObjectReader reader = new ObjectMapper().readerFor(Map.class);

    @GetMapping("/kluczdostepu")
    public ResponseEntity<String> jsonTree(@RequestParam String id) {
        List<String> devicesList;
        List<String> ToplevelDevices= new ArrayList<String>();
        JsonObject root=new JsonObject();
        devicesList = dataHolderService.getAllChildrenForGivenCompanyId(id);
        if (devicesList==null)
        return ResponseEntity.ok().body(root.toString());
        for(int i=0;i<devicesList.size();i++)
        {

            if (dataHolderService.getParentForGivenDeviceId(devicesList.get(i)) == null) {
                ToplevelDevices.add(devicesList.get(i));
                logger.info(devicesList.get(i));
            }
            
        }
        
        ArrayList<JsonArray> list= new ArrayList<JsonArray>();
        for(int i=0;i<20;i++)
        {
            JsonArray devices= new JsonArray();
            list.add(devices);

        }
        JsonObject currentObject=new JsonObject();
        JsonObject subDevice=new JsonObject();
        for(int i=0;i<ToplevelDevices.size();i++)
        {   String ToplevelID=ToplevelDevices.get(i);

            Integer ToplevelStatus=statusService.getCalculatedStatus(ToplevelID);
            if(ToplevelStatus!=null){


            Long ToplevelTimestamp=statusService.getDeviceStatus(ToplevelID).getLogged_at();
            Integer ToplevelType=2;

            currentObject=proc.convertToJsonTreeComponent(ToplevelID,ToplevelStatus,ToplevelTimestamp,ToplevelType);
            logger.info(currentObject.toString());
            List<String> MidList=dataHolderService.getAllChildrenForGivenDeviceId(ToplevelID);
            if(MidList==null){
                MidList=new ArrayList<String>();
            }
            JsonArray gatewayIdArray = new JsonArray();
            for (String MidlevelId : MidList) {
                gatewayIdArray.add(new JsonPrimitive(MidlevelId));
            }
            currentObject.add("children", gatewayIdArray);
            list.get(0).add(currentObject);
            for(int j=0;j<MidList.size();j++)
            {
                String MidlevelId= MidList.get(j);
                List<String> BottomList=dataHolderService.getAllChildrenForGivenDeviceId(MidlevelId);
                if (BottomList == null) {
                    continue;
                }
                JsonArray sensorIdArray = new JsonArray();
                for (String BottomlevelID : BottomList) {
                    sensorIdArray.add(new JsonPrimitive(BottomlevelID));
                }
                Integer MidlevelStatus=statusService.getCalculatedStatus(MidlevelId);
                Integer MidlevelType=1;
                if(MidlevelStatus!=null){
                    Long MidlevelTimestamp=statusService.getDeviceStatus(MidlevelId).getLogged_at();

                    subDevice=proc.convertToJsonTreeComponent(MidlevelId,MidlevelStatus,MidlevelTimestamp,MidlevelType);
                    subDevice.add("children",sensorIdArray);
                    list.get(1).add(subDevice);

                    for(int k=0;k<BottomList.size();k++)
                    {
                        String BottomlevelID =BottomList.get(k) ;
                        logger.info("kd 4");

                        Integer BottomlevelStatus=statusService.getCalculatedStatus(BottomlevelID);
                        if(BottomlevelStatus!=null){
                            Long BottomlevelTimestamp=statusService.getDeviceStatus(BottomlevelID).getLogged_at();
                            Integer BottomlevelType=0;
                            subDevice=proc.convertToJsonTreeComponent(BottomlevelID,BottomlevelStatus,BottomlevelTimestamp,BottomlevelType);
                            list.get(2).add(subDevice);
                        }
            
                    }
                }
            }
            }
        }
        for(int i=0;i<20;i++)
        {
            if(list.get(i).size()==0)
            break;
            root.add("devices"+String.valueOf(i),list.get(i));
        }
        return ResponseEntity.ok().body(root.toString());
    }

   

    @GetMapping("/historyTree")
    public ResponseEntity<String> historyTree(@RequestParam String id) {
        List<String> devicesList;
        List<String> ToplevelDevices= new ArrayList<String>();
        JsonObject root=new JsonObject();
        devicesList = dataHolderService.getAllChildrenForGivenCompanyId(id);
        if (devicesList==null)
        return ResponseEntity.ok().body(root.toString());
        for(int i=0;i<devicesList.size();i++)
        {

            if(dataHolderService.getParentForGivenDeviceId(devicesList.get(i)) == null)
            {
            ToplevelDevices.add(devicesList.get(i));
            logger.info(devicesList.get(i));
            }
            
        }
        ArrayList<JsonArray> list= new ArrayList<JsonArray>();
        JsonArray devices= new JsonArray();
        list.add(devices);
        for(int i=0;i<ToplevelDevices.size();i++)
        {   String ToplevelID=ToplevelDevices.get(i);
            Double ToplevelStatus=historyService.uptimePercent(ToplevelID);
            if(ToplevelStatus!=null){

            


            List<String> MidList=dataHolderService.getAllChildrenForGivenDeviceId(ToplevelID);
            if(MidList==null){
                MidList=new ArrayList<String>();
            }
            list.get(0).add(new JsonPrimitive(ToplevelStatus));
            for(int j=0;j<MidList.size();j++)
            {
                String MidlevelId= MidList.get(j);
                List<String> BottomList=dataHolderService.getAllChildrenForGivenDeviceId(MidlevelId);
                if (BottomList == null) {
                    continue;
                }
                Double MidlevelStatus=historyService.uptimePercent(MidlevelId);
                if(MidlevelStatus!=null){
                    list.get(0).add(MidlevelStatus);
                    for(int k=0;k<BottomList.size();k++)
                    {
                        String BottomlevelID =BottomList.get(k) ;
                        Double BottomlevelStatus=historyService.uptimePercent(BottomlevelID);
                        if(BottomlevelStatus!=null){
                            list.get(0).add(BottomlevelStatus);
                        }
            
                    }
                }
            }
            }
        }
        root.add("uptimes",list.get(0));
        return ResponseEntity.ok().body(root.toString());
    }
    @GetMapping("/history")
    public ResponseEntity<String> singleDeviceHistory(@RequestParam String id,String device_id   ) {
        List<String> devicesList;
        List<String> ToplevelDevices= new ArrayList<String>();
        JsonObject root=new JsonObject();
        devicesList = dataHolderService.getAllChildrenForGivenCompanyId(id);
        if(devicesList==null)
        {
            return ResponseEntity.badRequest().body("");
        }
        Double status=null;
        if(devicesList.contains(device_id))
        {
             status=historyService.uptimePercent(device_id);
        }
        else{
            return ResponseEntity.badRequest().body("");
        }
        if(status==null)
        {
            status=0D;
        }
        root.addProperty("uptime", status);
        return ResponseEntity.ok().body(root.toString());
    }

    
}
