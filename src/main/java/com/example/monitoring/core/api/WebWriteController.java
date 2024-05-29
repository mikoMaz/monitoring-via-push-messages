package com.example.monitoring.core.api;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.aspectj.weaver.tools.Trace;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.monitoring.core.bridge.BridgeData;
import com.example.monitoring.core.bridge.BridgeService;


@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class WebWriteController {
    private final BridgeService bridgeService;

    @GetMapping("/kluczdostepu")
    public ResponseEntity<String> jsonTree(@RequestParam Integer id) {
        List<BridgeData> bdList;
        bdList = bridgeService.allBridges(id);
        
        return ResponseEntity.ok().body(bdList.getFirst().toString());
    }
    
}
