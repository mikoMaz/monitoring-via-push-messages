package com.example.monitoring.core.external;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface CsvService {
    List<List<String>> readCsv(MultipartFile file);

    boolean csvToDeviceObjectFromDevice(List<List<String>> csvInList);

    boolean csvToDeviceObjectFromHierarchy(List<List<String>> csvInList);
}
