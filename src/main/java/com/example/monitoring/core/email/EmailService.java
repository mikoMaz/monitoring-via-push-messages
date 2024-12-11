package com.example.monitoring.core.email;

public interface EmailService {
    String sendMail(String recipient, String subject, String body);
    String sendHtmlMail(String recipient, String subject, String htmlBody);
}
