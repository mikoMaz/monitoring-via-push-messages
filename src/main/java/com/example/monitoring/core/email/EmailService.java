package com.example.monitoring.core.email;

public interface EmailService {
    String sendMail(String recipient, String subject, String body);
}
