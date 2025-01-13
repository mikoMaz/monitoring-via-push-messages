package com.example.monitoring.core.external;

import java.util.List;

import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class CsvController {
    private final CsvService csvService;
    private final DataHolderService dataHolderService;
    org.slf4j.Logger logger = LoggerFactory.getLogger(CsvController.class);

    @PostMapping("/upload-csv")
    public ResponseEntity<String> csvUpload(
            @RequestParam("type") String type,
            @RequestParam("tableName") String tableName,
            @RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Empty file");
        }
        if (tableName.isEmpty()) {
            return ResponseEntity.badRequest().body("Empty tableName");
        }

        List<List<String>> csv = csvService.readCsv(file);
        logger.info("csv read:");
        logger.info(csv.toString());
        if (type.equals("device")) {
            if (!csvService.csvToDeviceObjectFromDevice(csv)) {
                ResponseEntity.badRequest().body("CSV has a number of columns other than 2");
            }
        }
        if (type.equals("hierarchy")) {
            if (!csvService.csvToDeviceObjectFromHierarchy(csv)) {
                ResponseEntity.badRequest().body("CSV has a number of columns other than 2");
            }
        }

        // TODO save to db
        return ResponseEntity.ok(file.getOriginalFilename());
    }
}
