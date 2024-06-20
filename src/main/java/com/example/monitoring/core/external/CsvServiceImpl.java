package com.example.monitoring.core.external;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CsvServiceImpl implements CsvService {
    private final DataHolderService dataHolderService;

    @Override
    public List<List<String>> readCsv(MultipartFile file) {
        List<List<String>> records = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] values = line.split(",");
                records.add(Arrays.asList(values));
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return records;
    }

    @Override
    public boolean csvToDeviceObjectFromDevice(List<List<String>> csvInList) {
        if (csvInList == null || csvInList.isEmpty()) {
            return false;
        }
        if (csvInList.getFirst().size() != 2) {
            return false;
        }
        csvInList.removeFirst();
        csvInList.forEach(
                listRow -> {
                    // 
                    // 
                    // tabelka1
                    dataHolderService.addDeviceIfNotExist(listRow.getFirst());
                    dataHolderService.addCompanyIdToDeviceData(listRow.getFirst(), listRow.getLast());
                    //git tabelka3
                    dataHolderService.addCompanyIfNotExist(listRow.getLast());
                    dataHolderService.addDeviceIdToCompanyData(listRow.getLast(), listRow.getFirst());
                }
        );
        return true;
    }

    @Override
    public boolean csvToDeviceObjectFromHierarchy(List<List<String>> csvInList) {
        if (csvInList == null || csvInList.isEmpty()) {
            return false;
        }
        if (csvInList.getFirst().size() != 2) {
            return false;
        }
        csvInList.removeFirst();
        csvInList.forEach(
                listRow -> {
                    //tabelka1
                    dataHolderService.addDeviceIfNotExist(listRow.getFirst());
                    dataHolderService.addParentIdToDeviceData(listRow.getFirst(), listRow.getLast());
                    //tabelka2
                    dataHolderService.addDeviceParentIfNotExists(listRow.getLast());
                    dataHolderService.addChildForGivenParentId(listRow.getLast(),listRow.getFirst());
                }
        );
        return true;
    }
}
