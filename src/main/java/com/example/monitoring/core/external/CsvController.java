package com.example.monitoring.core.external;

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

    @PostMapping("/upload-csv")
    public ResponseEntity<String> csvUpload(
            @RequestParam("type") String type,
            @RequestParam("tableName") String tableName,
            @RequestParam("file") MultipartFile file) {

        csvService.csvHandler(type, tableName, file);
        return ResponseEntity.ok(file.getOriginalFilename());
    }
}
