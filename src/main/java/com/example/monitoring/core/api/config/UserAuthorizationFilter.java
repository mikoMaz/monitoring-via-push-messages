package com.example.monitoring.core.api.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class UserAuthorizationFilter extends OncePerRequestFilter {
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        String emailFromRequest = "test@test.pl";

        // TODO: uncomment when PR: getting email from request, dummy email above for testing
//        final String emailFromRequest = request.getHeader("Email");
//
//        if (emailFromRequest == null) {
//            // TODO send error status
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        System.out.println("email from request: " + emailFromRequest);  // TODO delete when PR


        /*final String authHeader = request.getHeader("Authorization");

        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            System.out.println("Authorization header not found");
            filterChain.doFilter(request, response);
            return;
        }*/


//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//
//        if (authentication != null && authentication.isAuthenticated()) {
//            System.out.println("already authenticated");
//        } else {
//            System.out.println("not auth yet: it's bad behaviour I think");
//        }

        try {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(emailFromRequest);
            System.out.println(userDetails.getUsername());
            System.out.println(userDetails.getAuthorities());
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities()
            );
            authenticationToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
            );
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        } catch (UsernameNotFoundException e) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "User not found");
            filterChain.doFilter(request, response);
            return;
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Internal server error");
            filterChain.doFilter(request, response);
            return;
        }

        filterChain.doFilter(request, response);
    }
}
