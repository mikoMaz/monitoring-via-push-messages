package com.example.monitoring.core.company;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    Company findCompanyByName(String companyName);

    Company getCompanyByNameAndEncryptedKey(String name, String encryptedKey);
}
