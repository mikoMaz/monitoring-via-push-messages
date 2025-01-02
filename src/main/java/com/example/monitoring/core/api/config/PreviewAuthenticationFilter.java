package com.example.monitoring.core.api.config;

import com.example.monitoring.core.company.Company;
import com.example.monitoring.core.company.CompanyRepository;
import com.example.monitoring.core.company.EncryptionUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class PreviewAuthenticationFilter extends OncePerRequestFilter {

    private final CompanyRepository companyRepository;

    private static final String encryptionKey = "807d16901f1752a8bc2d0b1e77f1cb72";

    private static final String API_KEY_HEADER = "x-api-key";

    org.slf4j.Logger logger = LoggerFactory.getLogger(PreviewAuthenticationFilter.class);

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        String companyName = request.getParameter("company");

        try {
            String apiKey = request.getHeader(API_KEY_HEADER);
            String encryptedKey = EncryptionUtil.encrypt(apiKey, encryptionKey);
            Company company = companyRepository.getCompanyByNameAndEncryptedKey(companyName, encryptedKey);

            if (company == null) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Company not found or invalid API Key");
                return;
            } else {
                PreviewAuthenticationToken authToken = new PreviewAuthenticationToken(company);
                authToken.setAuthenticated(true);
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        } catch (NullPointerException e) {
            logger.error("x-api-key header not found in request");
        } catch (Exception e) {
            logger.error("Unexpected error in PreviewAuthenticationFilter");
        }
        filterChain.doFilter(request, response);
    }
}
