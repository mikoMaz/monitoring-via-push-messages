package com.example.monitoring.core.api.config;

import com.example.monitoring.core.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;

import java.util.Collection;
import java.util.Collections;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtAuthenticationFilter authenticationFilter;
    private final UserAuthorizationFilter userAuthorizationFilter;
//    private final AuthenticationProvider authenticationProvider;

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
//                .securityMatcher("/api/v1/user/**", "/api/v1/device/**")
                .cors(AbstractHttpConfigurer::disable)  // TODO custom configuration
                .csrf(AbstractHttpConfigurer::disable)  // TODO
                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/api/v1/kluczdostepu").hasRole(Role.ADMIN.name())
//                        .requestMatchers("/api/v1/kluczdostepu").hasAuthority(Role.ADMIN.name())
//                        .requestMatchers("/api/v1/kluczdostepu").hasAuthority("SCOPE_profile")
                        .anyRequest().authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(withDefaults())
                        // when using custom converter
//                        .jwt(jwt -> jwt.jwtAuthenticationConverter(customJwtAuthenticationConverter()))
                )  // TODO audience check
                .addFilterBefore(userAuthorizationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

//    private Converter<Jwt, AbstractAuthenticationToken> customJwtAuthenticationConverter() {
//        return jwt -> {
////            Collection<GrantedAuthority> authorities = Collections.emptyList();
//            Collection<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"));
//            return new JwtAuthenticationToken(jwt, authorities);
//        };
//    }
}
