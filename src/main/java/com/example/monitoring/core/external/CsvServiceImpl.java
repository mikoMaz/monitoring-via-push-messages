package com.example.monitoring.core.external;

import lombok.RequiredArgsConstructor;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.monitoring.core.api.auth.AuthenticationController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Service
@RequiredArgsConstructor
public class CsvServiceImpl implements CsvService {
    private final DataHolderService dataHolderService;
        org.slf4j.Logger  logger =LoggerFactory.getLogger(AuthenticationController.class);

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
        dataHolderService.reset1();
        csvInList.removeFirst();
        csvInList.forEach(
                listRow -> {
                    // 
                    // 
                    // tabelka1
                    dataHolderService.addDeviceIfNotExist(listRow.getFirst());
                    dataHolderService.addCompanyIdToDeviceData(listRow.getFirst(), listRow.getLast());
                    //git tabelka4
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
        Map<String, List<String>> mapka = dataHolderService.getDeviceParentData();
        mapka.forEach((key, value) -> logger.info(key + " " + value));
        dataHolderService.reset2();
        mapka = dataHolderService.getDeviceParentData();
        mapka.forEach((key, value) -> logger.info(key + " " + value));
        csvInList.removeFirst();
        csvInList.forEach(
                listRow -> {
                    //tabelka2
                    dataHolderService.addDeviceChildIfNotExists(listRow.getFirst());
                    dataHolderService.addParentIdToDeviceParentData(listRow.getFirst(), listRow.getLast());

                    //tabelka3
                    dataHolderService.addDeviceParentIfNotExists(listRow.getLast());

                    dataHolderService.addChildForGivenParentId(listRow.getLast(),listRow.getFirst());
                }
        );
        return true;
    }
}
