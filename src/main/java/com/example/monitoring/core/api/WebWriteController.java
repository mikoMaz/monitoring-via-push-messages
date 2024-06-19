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

        devicesList = dataHolderService.getAllChildrenForGivenCompanyId(id);
        logger.info("TOPLEVELS:");
        for(int i=0;i<devicesList.size();i++)
        {
            
            if(dataHolderService.getParentIdFromDeviceData(devicesList.get(i))=="")
            {
            ToplevelDevices.add(devicesList.get(i));
            logger.info(devicesList.get(i));
            }
            
        }
        JsonObject root=new JsonObject();
        ArrayList<JsonArray> list= new ArrayList<JsonArray>();
        JsonObject savedDevice=new JsonObject();
        for(int i=0;i<20;i++)
        {
            JsonArray devices= new JsonArray();
            list.add(devices);

        }
        JsonObject currentObject=new JsonObject();
        for(int i=0;i<ToplevelDevices.size();i++)
        {   String ToplevelID=ToplevelDevices.get(i);
            Integer ToplevelStatus=statusService.getCalculatedStatus(ToplevelID);
            Long ToplevelTimestamp=statusService.getDeviceStatus(ToplevelID).getLogged_at();
            Integer ToplevelType=2;

            currentObject=proc.convertToJsonTreeComponent(ToplevelID,ToplevelStatus,ToplevelTimestamp,ToplevelType);
            logger.info(currentObject.toString());
            List<String> MidList=dataHolderService.getAllChildrenForGivenDeviceId(ToplevelID);
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
                JsonArray sensorIdArray = new JsonArray();
                for (String BottomlevelID : BottomList) {
                    sensorIdArray.add(new JsonPrimitive(BottomlevelID));
                }
                
                for(int k=0;k<BottomList.size();k++)
                {
                    String BottomlevelID =BottomList.get(k) ;
                    Integer BottomlevelStatus=statusService.getCalculatedStatus(BottomlevelID);
                    Long BottomlevelTimestamp=statusService.getDeviceStatus(BottomlevelID).getLogged_at();
                    Integer BottomlevelType=0;
                    JsonObject subDevice=proc.convertToJsonTreeComponent(BottomlevelID,BottomlevelStatus,BottomlevelTimestamp,BottomlevelType);
                    list.get(2).add(subDevice);
                }
                Integer MidlevelStatus=statusService.getCalculatedStatus(MidlevelId);
                Long MidlevelTimestamp=statusService.getDeviceStatus(MidlevelId).getLogged_at();
                Integer MidlevelType=0;
                JsonObject subDevice=proc.convertToJsonTreeComponent(MidlevelId,MidlevelStatus,MidlevelTimestamp,MidlevelType);
                subDevice.add("children",sensorIdArray);
                list.get(1).add(subDevice);
                savedDevice=subDevice;
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
    @GetMapping("/history")
    public ResponseEntity<String> historyTree(@RequestParam String id) {
        List<String> devicesList;
        List<String> ToplevelDevices=new ArrayList<String>();

        devicesList = dataHolderService.getAllChildrenForGivenCompanyId(id);
        for(int i=0;i<devicesList.size();i++)
        {
            if(dataHolderService.getParentIdFromDeviceData(devicesList.get(i))=="")
            ToplevelDevices.add(devicesList.get(i));
        }
        JsonObject root=new JsonObject();
        ArrayList<JsonArray> list= new ArrayList<JsonArray>();
        JsonObject savedDevice=new JsonObject();
        for(int i=0;i<20;i++)
        {
            JsonArray devices= new JsonArray();
            list.add(devices);

        }
        JsonObject currentObject=new JsonObject();
        for(int i=0;i<ToplevelDevices.size();i++)
        {   String ToplevelID=ToplevelDevices.get(i);
            Double ToplevelStatus=historyService.uptimePercent(ToplevelID);
            Long ToplevelTimestamp=statusService.getDeviceStatus(ToplevelID).getLogged_at();
            Integer ToplevelType=2;

            currentObject=proc.convertToJsonTreeComponent(ToplevelID,ToplevelStatus,ToplevelTimestamp,ToplevelType);
            List<String> MidList=dataHolderService.getAllChildrenForGivenDeviceId(ToplevelID);
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
                JsonArray sensorIdArray = new JsonArray();
                for (String BottomlevelID : BottomList) {
                    sensorIdArray.add(new JsonPrimitive(BottomlevelID));
                }
                
                for(int k=0;k<BottomList.size();k++)
                {
                    String BottomlevelID =BottomList.get(k) ;
                    Double BottomlevelStatus=historyService.uptimePercent(BottomlevelID);
                    Long BottomlevelTimestamp=statusService.getDeviceStatus(BottomlevelID).getLogged_at();
                    Integer BottomlevelType=0;
                    JsonObject subDevice=proc.convertToJsonTreeComponent(BottomlevelID,BottomlevelStatus,BottomlevelTimestamp,BottomlevelType);
                    list.get(2).add(subDevice);
                }
                Double MidlevelStatus=historyService.uptimePercent(MidlevelId);
                Long MidlevelTimestamp=statusService.getDeviceStatus(MidlevelId).getLogged_at();
                Integer MidlevelType=0;
                JsonObject subDevice=proc.convertToJsonTreeComponent(MidlevelId,MidlevelStatus,MidlevelTimestamp,MidlevelType);
                subDevice.add("children",sensorIdArray);
                list.get(1).add(subDevice);
                savedDevice=subDevice;
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
   
    
}
