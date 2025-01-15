package com.example.monitoring.core.external;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.example.monitoring.core.external.exceptions.FileCorruptionException;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CsvServiceImpl implements CsvService {

    private final DataHolderService dataHolderService;

    org.slf4j.Logger logger = LoggerFactory.getLogger(CsvServiceImpl.class);

    @Override
    public void csvHandler(String type, String tableName, MultipartFile file) {
        if (file.isEmpty()) {
            logger.error("CSV file is empty");
            throw new FileCorruptionException("Empty file");
        }
        if (tableName.isEmpty()) {
            logger.error("CSV tableName is empty");
            throw new FileCorruptionException("Empty tableName");
        }

        List<List<String>> csv = this.readCsv(file);

        if (type.equals("device")) {
            if (!this.csvDeviceTable(csv)) {
                ResponseEntity.badRequest().body("CSV has a number of columns other than 2");
//                throw new FileCorruptionException("CSV has a number of columns other than 2");
            }
        }

        if (type.equals("hierarchy")) {
            if (!this.csvHierarchyTable(csv)) {
                ResponseEntity.badRequest().body("CSV has a number of columns other than 2");
//                throw new FileCorruptionException("CSV has a number of columns other than 2");
            }
        }
    }

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
    public boolean csvDeviceTable(List<List<String>> csvInList) {
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
                    // tabelka1
                    dataHolderService.addDeviceIfNotExist(listRow.getFirst());
                    dataHolderService.addCompanyIdToDeviceData(listRow.getFirst(), listRow.getLast());
                    // git tabelka4
                    dataHolderService.addCompanyIfNotExist(listRow.getLast());
                    dataHolderService.addDeviceIdToCompanyData(listRow.getLast(), listRow.getFirst());
                });
        return true;
    }

    @Override
    public boolean csvHierarchyTable(List<List<String>> csvInList) {
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
                    // tabelka2
                    dataHolderService.addDeviceChildIfNotExists(listRow.getFirst());
                    dataHolderService.addParentIdToDeviceParentData(listRow.getFirst(), listRow.getLast());

                    // tabelka3
                    dataHolderService.addDeviceParentIfNotExists(listRow.getLast());

                    dataHolderService.addChildForGivenParentId(listRow.getLast(), listRow.getFirst());
                });
        return true;
    }

    @Override
    @Deprecated
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
                    // tabelka1
                    dataHolderService.addDeviceIfNotExist(listRow.getFirst());
                    dataHolderService.addCompanyIdToDeviceData(listRow.getFirst(), listRow.getLast());
                    // git tabelka4
                    dataHolderService.addCompanyIfNotExist(listRow.getLast());
                    dataHolderService.addDeviceIdToCompanyData(listRow.getLast(), listRow.getFirst());
                });
        return true;
    }

    @Override
    @Deprecated
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
                    // tabelka2
                    dataHolderService.addDeviceChildIfNotExists(listRow.getFirst());
                    dataHolderService.addParentIdToDeviceParentData(listRow.getFirst(), listRow.getLast());

                    // tabelka3
                    dataHolderService.addDeviceParentIfNotExists(listRow.getLast());

                    dataHolderService.addChildForGivenParentId(listRow.getLast(), listRow.getFirst());
                });
        return true;
    }
}
