package com.example.monitoring.core.api.auth;

import com.example.monitoring.core.api.payload.Payload;
import com.example.monitoring.core.api.payload.Role;
import com.example.monitoring.core.api.config.JwtService;
import com.example.monitoring.core.api.payload.PayloadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final PayloadRepository repository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationResponse register(RegisterRequest request) {
        var device = Payload.builder()
                .deviceId(request.getDeviceId())
                .deviceType(request.getDeviceType())
                .role(Role.DEVICE)
//                .password(passwordEncoder.encode(request.getPassword()))
                .build();
//        repository.save(device);
        var jwtToken = jwtService.generateToken(device);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getDeviceId(),
                        request.getDeviceType()
                )
        );
        var device = repository.findByDeviceId(request.getDeviceId())
                .orElseThrow();  // TODO: handle exception
        var jwtToken = jwtService.generateToken(device);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public String extractDeviceId(String token) {
        return jwtService.extractDeviceId(token);
    }

    public String extractToken(String authHeader) {
        return authHeader.substring(7);
    }

    public String extractDeviceType(String token) {
        return jwtService.extractDeviceType(token);
    }
}
