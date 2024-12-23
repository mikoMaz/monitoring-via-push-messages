package com.example.monitoring.core.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String sender;

    @Autowired
    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public String sendMail(Email email) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();

            message.setFrom(sender);
            message.setTo(email.getRecipient());
            message.setSubject(email.getSubject());
            message.setText(email.getBody());

            mailSender.send(message);
            return "Email sent successfully";
        } catch (Exception e) {
            return "Email sent failed";
        }
    }

    public String sendHtmlMail(Email email) {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper;

        try {
            messageHelper = new MimeMessageHelper(message, true);
            messageHelper.setFrom(sender);
            messageHelper.setTo(email.getRecipient());
            messageHelper.setSubject(email.getSubject());
            messageHelper.setText(email.getBody(), true);

            mailSender.send(message);
            return "Email sent successfully";
        } catch (MessagingException e) {
            throw new RuntimeException("Unable to send email");
        }
    }
}
