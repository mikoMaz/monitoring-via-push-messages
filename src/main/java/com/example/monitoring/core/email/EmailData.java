package com.example.monitoring.core.email;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "email_data")
public class EmailData {

    @Id
    @Enumerated(EnumType.STRING)
    private EmailContext context;

    @Column(length = 100000)
    // TODO: blob type
    private String mailBody;
}
