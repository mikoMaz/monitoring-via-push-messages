package com.example.monitoring.core.api;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.aspectj.weaver.tools.Trace;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.monitoring.core.sensor.SensorDataSimplifiedService;
import com.example.monitoring.core.bridge.BridgeData;
import com.example.monitoring.core.bridge.BridgeRequest;
import com.example.monitoring.core.bridge.BridgeService;
import com.example.monitoring.core.bridge.BridgeServiceImpl;
import com.example.monitoring.core.gateway.GatewayData;
import com.example.monitoring.core.gateway.GatewayRepository;
import com.example.monitoring.core.gateway.GatewayRequest;
import com.example.monitoring.core.gateway.GatewayService;
import com.example.monitoring.core.gateway.GatewayServiceImpl;
@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class WebWriteController {
    @GetMapping("/kluczdostepu")
    public ResponseEntity<String> jsonTree(@RequestParam Integer id) {
        GatewayServiceImpl gatewayService= new GatewayServiceImpl(null);
        BridgeServiceImpl bridgeService=new BridgeServiceImpl(null);
        List<BridgeData> bdList;
        bdList=bridgeService.allBridges(153);
        
        
        return ResponseEntity.ok().body(bdList.getFirst().toString());


    }
    
}
