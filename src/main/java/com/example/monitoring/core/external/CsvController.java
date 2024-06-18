package com.example.monitoring.core.external;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CsvController {
    private final CsvService csvService;
    private final DataHolderService dataHolderService;

    @PostMapping("/upload-csv")
    public ResponseEntity<String> csvUpload(
            @RequestParam("type") String type,
            @RequestParam("tableName") String tableName,
            @RequestParam("file") MultipartFile file
    ) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Empty file");
        }
        if (tableName.isEmpty()) {
            return ResponseEntity.badRequest().body("Empty tableName");
        }

        List<List<String>> csv = csvService.readCsv(file);

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
