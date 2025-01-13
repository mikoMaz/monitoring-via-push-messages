package com.example.monitoring.core.api.preview;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.monitoring.core.api.abstraction.IDevicesModelService;
import com.example.monitoring.core.company.CompanyService;
import com.google.gson.JsonObject;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/preview")
@RequiredArgsConstructor
public class PreviewWebDevicesModelController {

    private final IDevicesModelService devicesModelService;
    private final CompanyService companyService;

    @GetMapping("/jsonTree")
    public ResponseEntity<String> jsonTree(@RequestParam String companyName) {
        String id = companyService.findCompanyByName(companyName).getCompanyId().toString();
        JsonObject jsonTree = devicesModelService.getJsonTree(id);
        return ResponseEntity.ok().body(jsonTree.toString());
    }

    @GetMapping("/historyTree")
    public ResponseEntity<String> historyTree(@RequestParam String companyName) {
        String id = companyService.findCompanyByName(companyName).getCompanyId().toString();
        JsonObject historyTree = devicesModelService.getHistoryTree(id);
        return ResponseEntity.ok().body(historyTree.toString());
    }
}
