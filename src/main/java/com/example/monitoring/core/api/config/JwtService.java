package com.example.monitoring.core.api.config;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
    private static final String SECRET_KEY = "eyJhbGciOiJIUzI1NiJ9eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNTEwNDIwNCwiaWF0IjoxNzE1MTA0MjA0fQsnPWyH323VKPwvvVUeL2KhqI7kS81dKlcJtm7UlFwI";

    public String extractDeviceId(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    public String extractDeviceType(String token) {
        final Claims claims = extractClaims(token);
        return claims.get("deviceType", String.class);
    }

    public Claims extractUnsecuredToken(String token) {
        String[] parts = token.split("\\.");

        if (parts.length != 3) {
            throw new IllegalArgumentException("Invalid JWT token");
        }

        String payload = parts[1];

        // typ: JWT, alg: none
        String newHeader = "eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0";
        String newToken = newHeader + "." + payload + ".";

        return Jwts.parser().unsecured().build().parseUnsecuredClaims(newToken).getPayload();
    }

    public <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(Map<String, Object> claims, UserDetails userDetails) {
        return Jwts
                .builder()
                .claims() // TODO check if it's okay
                .subject(userDetails.getUsername())
                .add("deviceType", userDetails.getPassword())
                .add(claims)
                .and()
                .signWith(getSigningKey())
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        String deviceId = extractDeviceId(token);
        return deviceId.equals(userDetails.getUsername()); // && !isTokenExpired(token);
    }

    private Claims extractClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSigningKey() {
        byte[] keyByes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyByes);
    }
}
