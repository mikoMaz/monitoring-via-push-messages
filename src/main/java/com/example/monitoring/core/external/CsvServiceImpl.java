package com.example.monitoring.core.external;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.monitoring.core.api.auth.AuthenticationController;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CsvServiceImpl implements CsvService {
    private final DataHolderService dataHolderService;
    org.slf4j.Logger logger = LoggerFactory.getLogger(CsvServiceImpl.class);

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
        logger.info("inside csvToDeviceObjectFromDevice");

        if (csvInList == null || csvInList.isEmpty()) {
            return false;
        }
        logger.info("Inlinst is not null nor empty");
        logger.info(csvInList.getFirst().toString());
        logger.info(Integer.toString(csvInList.getFirst().size()));
        if (csvInList.getFirst().size() != 2) {
            return false;
        }
        logger.info("got 2 columns");

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
                    logger.info(dataHolderService.getAllChildrenForGivenCompanyId(null).toString());
                });
        logger.info("after foreach, final getCompanyData()");
        logger.info(dataHolderService.getCompanyData().toString());
        logger.info("final getDeviceData()");
        logger.info(dataHolderService.getDeviceData().toString());
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
                    // tabelka2
                    dataHolderService.addDeviceChildIfNotExists(listRow.getFirst());
                    dataHolderService.addParentIdToDeviceParentData(listRow.getFirst(), listRow.getLast());

                    // tabelka3
                    dataHolderService.addDeviceParentIfNotExists(listRow.getLast());

                    dataHolderService.addChildForGivenParentId(listRow.getLast(), listRow.getFirst());
                });
                logger.info("final getDeviceChildrenData");
                logger.info(dataHolderService.getDeviceChildrenData().toString());
                logger.info("getDeviceParentData");
                logger.info(dataHolderService.getDeviceParentData().toString());
        return true;
    }
}
