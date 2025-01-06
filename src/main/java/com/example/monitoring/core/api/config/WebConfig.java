package com.example.monitoring.core.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**");
        // .allowedMethods(CorsConfiguration.ALL)
        // .allowedHeaders(CorsConfiguration.ALL)
        // .allowedOriginPatterns(CorsConfiguration.ALL)
        // .allowCredentials(true);
    }
}
