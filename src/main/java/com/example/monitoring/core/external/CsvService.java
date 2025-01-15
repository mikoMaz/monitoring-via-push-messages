package com.example.monitoring.core.external;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface CsvService {

    void csvHandler(String type, String tableName, MultipartFile file);

    List<List<String>> readCsv(MultipartFile file);

    boolean csvDeviceTable(List<List<String>> csvInList);

    boolean csvHierarchyTable(List<List<String>> csvInList);

    @Deprecated
    boolean csvToDeviceObjectFromDevice(List<List<String>> csvInList);

    @Deprecated
    boolean csvToDeviceObjectFromHierarchy(List<List<String>> csvInList);
}
