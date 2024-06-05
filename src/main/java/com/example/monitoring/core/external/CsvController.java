package com.example.monitoring.core.external;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CsvController {

    @PostMapping("/upload-csv")
    public ResponseEntity<String> csvUpload(
            @RequestParam("tableName") String tableName,
            @RequestParam("file") MultipartFile file
    ) {
        System.out.println("saving csv file");
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Empty file");
        }
        if (tableName.isEmpty()) {
            return ResponseEntity.badRequest().body("Empty tableName");
        }

        // TODO generate hashmap

        // TODO save to db
        // TODO make class for saving table

        return ResponseEntity.ok(file.getOriginalFilename());
    }
}
