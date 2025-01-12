package com.example.monitoring.core.api.config;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.monitoring.core.api.payload.Payload;
import com.example.monitoring.core.api.payload.Role;

import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import io.jsonwebtoken.security.WeakKeyException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String token;
        final String deviceId;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        token = authHeader.substring(7);

        // TODO: should be caught in separated class(?)
        try {
            deviceId = jwtService.extractDeviceId(token);
        } catch (SignatureException e) {
            System.err.println("Invalid JWT token");
            filterChain.doFilter(request, response);
            return;
        } catch (WeakKeyException e) {
            System.err.println("Weak key exception");
            filterChain.doFilter(request, response);
            return;
        } catch (MalformedJwtException e) {
            System.err.println("MalformedJwt exception");
            filterChain.doFilter(request, response);
            return;
        } catch (UnsupportedJwtException e) {
            System.err.println("UnsupportedJwtException exception");
            filterChain.doFilter(request, response);
            return;
        }

        if (deviceId != null && SecurityContextHolder.getContext().getAuthentication() == null) { // user is not auth
            Payload userDetails = Payload.builder()
                    .deviceId(deviceId)
                    .deviceType("default")
                    .role(Role.USER)
                    .password("defaultPassword")
                    .build();
            if (jwtService.isTokenValid(token, userDetails)) {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());
                authentication.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        filterChain.doFilter(request, response);
    }
}
