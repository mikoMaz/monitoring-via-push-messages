package com.example.monitoring.core.email;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailDataRepository extends JpaRepository<EmailData, EmailContext> {
    EmailData findByContext(EmailContext context);
}
