package com.example.monitoring.core.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example.monitoring.core.api.abstraction.IDevicesModelService;
import com.example.monitoring.core.api.history.DeviceHistoryService;
import com.example.monitoring.core.device.DeviceService;
import com.example.monitoring.core.status.DeviceStatusService;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DevicesModelService implements IDevicesModelService {

    private final DeviceHistoryService historyService;
    private final DeviceStatusService statusService;
    private final DeviceService deviceService;
    private final JsonTreeConverter proc;

    org.slf4j.Logger logger = LoggerFactory.getLogger(DevicesModelService.class);

    @Override
    public JsonObject getJsonTree(Long companyId) {
        List<String> devicesList;
        List<String> ToplevelDevices = new ArrayList<>();
        JsonObject root = new JsonObject();
        devicesList = deviceService.getAllChildrenForGivenCompanyId(companyId);

        if (devicesList == null) {
            return root;
        }

        for (int i = 0; i < devicesList.size(); i++) {
            if (deviceService.getParentIdFromDevice(devicesList.get(i)) == null) {
                ToplevelDevices.add(devicesList.get(i));
                logger.info(devicesList.get(i));
            }

        }

        ArrayList<JsonArray> list = new ArrayList<>();
        for (int i = 0; i < 20; i++) {
            JsonArray devices = new JsonArray();
            list.add(devices);

        }
        for (int i = 0; i < ToplevelDevices.size(); i++) {
            JsonObject topLevelObject;
            String ToplevelID = ToplevelDevices.get(i);
            Integer ToplevelStatus = statusService.getCalculatedStatus(ToplevelID);
            if (ToplevelStatus != null) {
                Integer ToplevelDeviceType;
                Long ToplevelTimestamp = statusService.getDeviceStatus(ToplevelID).getLogged_at();
                ToplevelDeviceType = 2;

                topLevelObject = proc.convertToJsonTreeComponent(ToplevelID, ToplevelStatus, ToplevelTimestamp,
                        ToplevelDeviceType);
                logger.info(topLevelObject.toString());
                List<String> MidList = deviceService.getAllChildrenForParentId(ToplevelID);
                if (MidList == null) {
                    MidList = new ArrayList<>();
                }
                JsonArray gatewayIdArray = new JsonArray();
                for (String MidlevelId : MidList) {
                    gatewayIdArray.add(new JsonPrimitive(MidlevelId));
                }
                topLevelObject.add("children", gatewayIdArray);
                list.get(0).add(topLevelObject);
                for (int j = 0; j < MidList.size(); j++) {
                    Integer MidlevelDeviceType;
                    JsonObject childDevice;
                    String MidlevelId = MidList.get(j);

                    Integer MidlevelStatus = statusService.getCalculatedStatus(MidlevelId);
                    MidlevelDeviceType = 1;
                    if (MidlevelStatus != null) {
                        Long MidlevelTimestamp = statusService.getDeviceStatus(MidlevelId).getLogged_at();

                        childDevice = proc.convertToJsonTreeComponent(MidlevelId, MidlevelStatus, MidlevelTimestamp,
                                MidlevelDeviceType);

                        List<String> BottomList = deviceService.getAllChildrenForParentId(MidlevelId);

                        if (BottomList.isEmpty()) {
                            MidlevelDeviceType = 0;
                            childDevice = proc.convertToJsonTreeComponent(MidlevelId, MidlevelStatus, MidlevelTimestamp,
                                    MidlevelDeviceType);
                            list.get(1).add(childDevice);
                            continue;
                        }
                        JsonArray sensorIdArray = new JsonArray();
                        for (String BottomlevelID : BottomList) {
                            sensorIdArray.add(new JsonPrimitive(BottomlevelID));
                        }
                        childDevice.add("children", sensorIdArray);
                        list.get(1).add(childDevice);

                        for (int k = 0; k < BottomList.size(); k++) {
                            JsonObject bottomDevice;
                            String BottomlevelID = BottomList.get(k);
                            Integer BottomlevelStatus = statusService.getCalculatedStatus(BottomlevelID);
                            if (BottomlevelStatus != null) {
                                Long BottomlevelTimestamp = statusService.getDeviceStatus(BottomlevelID).getLogged_at();
                                Integer BottomlevelDeviceType = 0;
                                bottomDevice = proc.convertToJsonTreeComponent(BottomlevelID, BottomlevelStatus,
                                        BottomlevelTimestamp, BottomlevelDeviceType);
                                list.get(2).add(bottomDevice);
                            }

                        }
                    }
                }
            }
        }
        for (int i = 0; i < 20; i++) {
            if (list.get(i).size() == 0) {
                break;
            }
            root.add("devices" + String.valueOf(i), list.get(i));
        }
        return root;
    }

    @Override
    public JsonObject getHistoryTree(Long companyId) {
        Map<String, JsonArray> deviceTypeMap = new HashMap<>();
        deviceTypeMap.put("upperLevel", new JsonArray());
        deviceTypeMap.put("middleLevel", new JsonArray());
        deviceTypeMap.put("bottomLevel", new JsonArray());

        JsonObject root = new JsonObject();

        List<String> devicesList = deviceService.getAllChildrenForGivenCompanyId(companyId);

        if (devicesList == null) {
            deviceTypeMap.forEach(root::add);
            return root;
        }

        List<String> toplevelDevices = new ArrayList<>();
        for (String deviceId : devicesList) {
            if (deviceService.getParentIdFromDevice(deviceId) == null) {
                toplevelDevices.add(deviceId);
                logger.info(deviceId);
            }
        }

        for (String topLevelDeviceId : toplevelDevices) {
            Double topLevelStatus = historyService.uptimePercent(topLevelDeviceId);
            if (topLevelStatus != null) {
                deviceTypeMap.get("upperLevel").add(new JsonPrimitive(topLevelStatus));

                List<String> midList = deviceService.getAllChildrenForParentId(topLevelDeviceId);
                if (!midList.isEmpty()) {
                    for (String midLevelId : midList) {
                        Double midLevelStatus = historyService.uptimePercent(midLevelId);
                        if (midLevelStatus != null) {
                            deviceTypeMap.get("middleLevel").add(new JsonPrimitive(midLevelStatus));

                            List<String> bottomList = deviceService.getAllChildrenForParentId(midLevelId);
                            if (!bottomList.isEmpty()) {
                                for (String bottomLevelId : bottomList) {
                                    Double bottomLevelStatus = historyService.uptimePercent(bottomLevelId);
                                    if (bottomLevelStatus != null) {
                                        deviceTypeMap.get("bottomLevel").add(new JsonPrimitive(bottomLevelStatus));
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        deviceTypeMap.forEach(root::add);
        return root;
    }

    @Override
    public JsonObject getSingleDeviceHistory(Long companyId, String deviceId) {
        List<String> devicesList;
        List<String> ToplevelDevices = new ArrayList<>();
        JsonObject root = new JsonObject();

        devicesList = deviceService.getAllChildrenForGivenCompanyId(companyId);

        if (devicesList == null) {
            return null;
        }
        Double status = null;
        if (devicesList.contains(deviceId)) {
            status = historyService.uptimePercent(deviceId);
        } else {
            return null;
        }
        if (status == null) {
            status = 0D;
        }
        root.addProperty("uptime", status);
        return root;
    }

    @Override
    public JsonArray getStatsByPeriod(Long companyId, Long StartTimeStamp, Long StopTimeStamp, String mode){ // hours,days,weeks,months(31 days)
        JsonArray root = new JsonArray();
        final Map<String, Long> modes = Map.of(
        "hour", 3600L,
        "day", 86400L,
        "week",604800L,
        "month",18748800L,
        "year",6843312000L);
        List<String>deviceIds = deviceService.getAllChildrenForGivenCompanyId(companyId);
        Map<String,List<Double>> companyUptimes = historyService.uptimePercentByPeriod(deviceIds,StartTimeStamp,StopTimeStamp,modes.get(mode)); //list is length of ceil of periods in range
        JsonObject periodSorted=new JsonObject();
        //key is just and integer that means period number
        int active;
        int inactive;
        int undefined;
        logger.info("companyUptimes.keyset()");
        logger.info(companyUptimes.keySet().toString());
        for (int i=0;i<companyUptimes.keySet().size();i++)
        {   active=0;inactive=0;undefined=0;
            periodSorted=new JsonObject();
            logger.info("i");
            logger.info(String.valueOf(i));
            for (Double value :companyUptimes.get(String.valueOf(i)) ) {
                //deviceUptimesJson.add(value);
                if(value<1d)
                {
                    inactive+=1;
                }
                else if(value<0d){
                    undefined+=1;
                }
                else
                {
                    active+=1;
                }
            }
            periodSorted.addProperty("timestamp", i);
            periodSorted.addProperty("active", active);
            periodSorted.addProperty("inactive",inactive);
            periodSorted.addProperty("disabled",undefined);

            root.add(periodSorted);
        }
        return root;
    }
}
