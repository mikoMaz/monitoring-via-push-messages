package com.example.monitoring.core.company;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;

@Data
@Entity
@Table(
        uniqueConstraints=@UniqueConstraint(columnNames={"id", "name"})
)
public class Company {

    @Id
    private Long id;

    private String name;

    private String encryptedKey;
}
