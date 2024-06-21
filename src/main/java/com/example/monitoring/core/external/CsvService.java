package com.example.monitoring.core.external;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CsvService {
    List<List<String>> readCsv(MultipartFile file);
    boolean csvToDeviceObjectFromDevice(List<List<String>> csvInList);
    boolean csvToDeviceObjectFromHierarchy(List<List<String>> csvInList);
}
