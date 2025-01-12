package com.example.monitoring.core.api.config;

import java.io.IOException;

import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.monitoring.core.company.Company;
import com.example.monitoring.core.company.CompanyRepository;
import com.example.monitoring.core.company.CompanyService;
import com.example.monitoring.core.company.EncryptionUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class PreviewAuthenticationFilter extends OncePerRequestFilter {

    private final CompanyRepository companyRepository;
    private final CompanyService companyService;

    public static final String encryptionKey = "807d16901f1752a8bc2d0b1e77f1cb72";

    private static final String COMPANYSECRET_HEADER = "CompanySecret";
    private static final String COMPANY_HEADER = "Company";

    org.slf4j.Logger logger = LoggerFactory.getLogger(PreviewAuthenticationFilter.class);

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        try {
            String companyName = request.getHeader(COMPANY_HEADER);
            String apiKey = request.getHeader(COMPANYSECRET_HEADER);

            if (companyName == null || apiKey == null) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Company not found or invalid Company Sectet");
                return;
            }
            String encryptedKey = EncryptionUtil.encrypt(apiKey, encryptionKey);
            Company company = companyService.getCompanyByNameAndEncryptedKey(companyName, encryptedKey);

            if (company == null) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Company not found or invalid Company Sectet");
                return;
            } else {
                PreviewAuthenticationToken authToken = new PreviewAuthenticationToken(company);
                authToken.setAuthenticated(true);
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        } catch (NullPointerException e) {
            logger.error("CompanySecret header not found in request");
        } catch (Exception e) {
            logger.error("Unexpected error in PreviewAuthenticationFilter");
        }
        filterChain.doFilter(request, response);
    }
}
