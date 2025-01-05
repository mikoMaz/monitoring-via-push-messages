package com.example.monitoring.core.company;

import org.springframework.stereotype.Service;

import static com.example.monitoring.core.api.config.PreviewAuthenticationFilter.encryptionKey;

@Service
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyServiceImpl(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public void setCompanyKey(String companyName, String newCompanyKey) throws Exception {
        Company company = companyRepository.findCompanyByName(companyName);
        String encryptedKey = EncryptionUtil.encrypt(newCompanyKey, encryptionKey);
        company.setEncryptedKey(encryptedKey);
        companyRepository.save(company);
    }
}
