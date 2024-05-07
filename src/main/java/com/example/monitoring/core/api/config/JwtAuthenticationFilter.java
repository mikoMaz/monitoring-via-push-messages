package com.example.monitoring.core.api.config;

import com.example.monitoring.core.api.payload.Payload;
import com.example.monitoring.core.api.payload.Role;
import io.jsonwebtoken.security.SignatureException;
import io.jsonwebtoken.security.WeakKeyException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
//        final String token = authHeader != null && authHeader.startsWith("Bearer ") ? authHeader.substring(7) : null;
        final String token;
        final String deviceId;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        token = authHeader.substring(7);

        // setting status not working properly; check if needed
        /*try {
            deviceId = jwtService.extractDeviceId(token);
            System.out.println("deviceId: " + deviceId);
//            response.setStatus(HttpStatus.OK.value());
//            response.setStatus(HttpServletResponse.SC_OK);
            return;
//            response.getWriter().println("Authentication successful");
        } catch (SignatureException e) {
            System.err.println("Invalid JWT signature");
        }*/

        // TODO: should be caught in separated class(?)
        /*try {
            deviceId = jwtService.extractDeviceId(token);
        } catch (SignatureException e) {
            System.err.println("Invalid JWT token");
            filterChain.doFilter(request, response);
            return;
        } catch (WeakKeyException e) {
            System.err.println("Weak key exception");
            filterChain.doFilter(request, response);
            return;
        }*/
        deviceId = jwtService.extractDeviceId(token);


        if (deviceId != null && SecurityContextHolder.getContext().getAuthentication() == null) {  // user is not auth
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
                        userDetails.getAuthorities()
                );
                authentication.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        filterChain.doFilter(request, response);
    }
}
