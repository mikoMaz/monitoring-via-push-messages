package com.example.monitoring.core.email;

public interface EmailService {
    String sendMail(Email email);
    String sendHtmlMail(Email email);
}
