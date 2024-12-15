package com.example.monitoring.core.api.config;

import com.example.monitoring.core.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;

import java.util.stream.Collectors;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtAuthenticationFilter authenticationFilter;
    private final UserAuthorizationFilter userAuthorizationFilter;
    private final UserDetailsService userDetailsService;

    @Bean
    public FilterRegistrationBean registration(JwtAuthenticationFilter filter) {
        FilterRegistrationBean registration = new FilterRegistrationBean(filter);
        registration.setEnabled(false);
        return registration;
    }

    @Bean
    public FilterRegistrationBean registrations(UserAuthorizationFilter filter) {
        FilterRegistrationBean registration = new FilterRegistrationBean(filter);
        registration.setEnabled(false);
        return registration;
    }

    @Bean
    @Order(1)
    public SecurityFilterChain sensorSecurityFilterChain(HttpSecurity http) throws Exception {
        http
                .securityMatcher("/api/v1/sensor/**")
                .cors(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/sensor/**").permitAll()  // TODO delete in prod
                        .anyRequest().authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .authenticationProvider(authenticationProvider)
//                .addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);
                .addFilterBefore(authenticationFilter, SecurityContextPersistenceFilter.class);
        return http.build();

    }

    @Bean
    @Order(2)
    public SecurityFilterChain userSecurityFilterChain(HttpSecurity http) throws Exception {
        http
//                .cors(AbstractHttpConfigurer::disable)  // TODO custom configuration
                .csrf(AbstractHttpConfigurer::disable)  // TODO
                .authorizeHttpRequests(auth -> auth
                        // TODO: add roles to rest of the paths
                        .requestMatchers("/api/v1/user/kluczdostepu").hasRole(Role.ADMIN.name())
//                        .requestMatchers("/api/v1/kluczdostepu").hasAuthority(Role.ADMIN.name())
//                        .requestMatchers("/api/v1/kluczdostepu").hasAuthority("SCOPE_profile")
                        .anyRequest().authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwtAuthenticationConverter(customJwtAuthenticationConverter()))
                );  // TODO audience check
        return http.build();
    }

    private Converter<Jwt, AbstractAuthenticationToken> customJwtAuthenticationConverter() {
            JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
            converter.setJwtGrantedAuthoritiesConverter(jwt -> {
                // TODO: extract email from claims when deployed
//                String email = jwt.getClaimAsString("Email");
//                String email = jwt.getClaims().toString();
                String email = "test@test.pl";
                UserDetails user = userDetailsService.loadUserByUsername(email);
//                return new SimpleGrantedAuthority("ROLE_" + user.getAuthorities());
                return user.getAuthorities().stream()
                        .map(authority -> (GrantedAuthority) authority)
                        .collect(Collectors.toList());
            });
        return converter;
    }
}
