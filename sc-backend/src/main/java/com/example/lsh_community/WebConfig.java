// src/main/java/com/example/lsh_community/WebConfig.java
package com.example.lsh_community;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry r) {
                r.addMapping("/**")
                        // ✅ 프론트 실제 포트 정확히 명시 (필요한 것만)
                        .allowedOrigins(
                                "http://localhost:3000",
                                "http://localhost:5173"
                        )
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true)   // 쿠키/인증 쓰면 유지, 아니면 false로 꺼도 됨
                        .maxAge(3600);
            }
        };
    }
}
