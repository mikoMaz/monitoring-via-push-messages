package com.example.monitoring.core.company;

import com.example.monitoring.core.user.User;
import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(
        name = "company",
        uniqueConstraints=@UniqueConstraint(columnNames={"name"})
)
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long companyId;

    private String name;

    private String encryptedKey;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
    private Set<User> users = new HashSet<>();
}
