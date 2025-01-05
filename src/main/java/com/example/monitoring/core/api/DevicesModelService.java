package com.example.monitoring.core.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example.monitoring.core.api.abstraction.IDevicesModelService;
import com.example.monitoring.core.api.auth.AuthenticationController;
import com.example.monitoring.core.api.history.DeviceHistoryService;
import com.example.monitoring.core.external.DataHolderService;
import com.example.monitoring.core.status.DeviceStatusService;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DevicesModelService implements IDevicesModelService {

    private final DeviceDataService deviceDataService;
    private final DeviceHistoryService historyService;
    private final DeviceStatusService statusService;
    private final DataHolderService dataHolderService;
    private final JsonTreeConverter proc;

    org.slf4j.Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    @Override
    public JsonObject getJsonTree(String id) {
        List<String> devicesList;
        List<String> ToplevelDevices = new ArrayList<>();
        JsonObject root = new JsonObject();
        devicesList = dataHolderService.getAllChildrenForGivenCompanyId(id);
        if (devicesList == null) {
            return root;
        }
        for (int i = 0; i < devicesList.size(); i++) {

            if (dataHolderService.getParentForGivenDeviceId(devicesList.get(i)) == null) {
                ToplevelDevices.add(devicesList.get(i));
                logger.info(devicesList.get(i));
            }

        }

        ArrayList<JsonArray> list = new ArrayList<>();
        for (int i = 0; i < 20; i++) {
            JsonArray devices = new JsonArray();
            list.add(devices);

        }
        JsonObject currentObject = new JsonObject();
        JsonObject subDevice = new JsonObject();
        for (int i = 0; i < ToplevelDevices.size(); i++) {
            String ToplevelID = ToplevelDevices.get(i);
            Integer ToplevelStatus = statusService.getCalculatedStatus(ToplevelID);
            if (ToplevelStatus != null) {

                Long ToplevelTimestamp = statusService.getDeviceStatus(ToplevelID).getLogged_at();
                Integer ToplevelType = 2;

                currentObject = proc.convertToJsonTreeComponent(ToplevelID, ToplevelStatus, ToplevelTimestamp, ToplevelType);
                logger.info(currentObject.toString());
                List<String> MidList = dataHolderService.getAllChildrenForGivenDeviceId(ToplevelID);
                if (MidList == null) {
                    MidList = new ArrayList<>();
                }
                JsonArray gatewayIdArray = new JsonArray();
                for (String MidlevelId : MidList) {
                    gatewayIdArray.add(new JsonPrimitive(MidlevelId));
                }
                currentObject.add("children", gatewayIdArray);
                list.get(0).add(currentObject);
                for (int j = 0; j < MidList.size(); j++) {
                    String MidlevelId = MidList.get(j);
                    List<String> BottomList = dataHolderService.getAllChildrenForGivenDeviceId(MidlevelId);
                    if (BottomList == null) {
                        continue;
                    }
                    JsonArray sensorIdArray = new JsonArray();
                    for (String BottomlevelID : BottomList) {
                        sensorIdArray.add(new JsonPrimitive(BottomlevelID));
                    }
                    Integer MidlevelStatus = statusService.getCalculatedStatus(MidlevelId);
                    Integer MidlevelType = 1;
                    if (MidlevelStatus != null) {
                        Long MidlevelTimestamp = statusService.getDeviceStatus(MidlevelId).getLogged_at();

                        subDevice = proc.convertToJsonTreeComponent(MidlevelId, MidlevelStatus, MidlevelTimestamp, MidlevelType);
                        subDevice.add("children", sensorIdArray);
                        list.get(1).add(subDevice);

                        for (int k = 0; k < BottomList.size(); k++) {
                            String BottomlevelID = BottomList.get(k);
                            Integer BottomlevelStatus = statusService.getCalculatedStatus(BottomlevelID);
                            if (BottomlevelStatus != null) {
                                Long BottomlevelTimestamp = statusService.getDeviceStatus(BottomlevelID).getLogged_at();
                                Integer BottomlevelType = 0;
                                subDevice = proc.convertToJsonTreeComponent(BottomlevelID, BottomlevelStatus, BottomlevelTimestamp, BottomlevelType);
                                list.get(2).add(subDevice);
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
    public JsonObject getHistoryTree(String id) {
        Map<String, JsonArray> deviceTypeMap = new HashMap<>();
        deviceTypeMap.put("upperLevel", new JsonArray());
        deviceTypeMap.put("middleLevel", new JsonArray());
        deviceTypeMap.put("bottomLevel", new JsonArray());

        List<String> devicesList = dataHolderService.getAllChildrenForGivenCompanyId(id);
        if (devicesList == null) {
            return new JsonObject();
        }

        List<String> toplevelDevices = new ArrayList<>();
        for (String deviceId : devicesList) {
            if (dataHolderService.getParentForGivenDeviceId(deviceId) == null) {
                toplevelDevices.add(deviceId);
                logger.info(deviceId);
            }
        }

        for (String topLevelDeviceId : toplevelDevices) {
            Double topLevelStatus = historyService.uptimePercent(topLevelDeviceId);
            if (topLevelStatus != null) {
                deviceTypeMap.get("upperLevel").add(new JsonPrimitive(topLevelStatus));

                List<String> midList = dataHolderService.getAllChildrenForGivenDeviceId(topLevelDeviceId);
                if (midList != null) {
                    for (String midLevelId : midList) {
                        Double midLevelStatus = historyService.uptimePercent(midLevelId);
                        if (midLevelStatus != null) {
                            deviceTypeMap.get("middleLevel").add(new JsonPrimitive(midLevelStatus));

                            List<String> bottomList = dataHolderService.getAllChildrenForGivenDeviceId(midLevelId);
                            if (bottomList != null) {
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

        JsonObject root = new JsonObject();
        deviceTypeMap.forEach(root::add);
        return root;
    }

    @Override
    public JsonObject getSingleDeviceHistory(String id, String device_id) {
        List<String> devicesList;
        List<String> ToplevelDevices = new ArrayList<>();
        JsonObject root = new JsonObject();
        devicesList = dataHolderService.getAllChildrenForGivenCompanyId(id);
        if (devicesList == null) {
            return null;
        }
        Double status = null;
        if (devicesList.contains(device_id)) {
            status = historyService.uptimePercent(device_id);
        } else {
            return null;
        }
        if (status == null) {
            status = 0D;
        }
        root.addProperty("uptime", status);
        return root;
    }

}
