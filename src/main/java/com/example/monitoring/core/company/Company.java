package com.example.monitoring.core.company;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(
        uniqueConstraints=@UniqueConstraint(columnNames={"name"})
)
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String encryptedKey;
}
