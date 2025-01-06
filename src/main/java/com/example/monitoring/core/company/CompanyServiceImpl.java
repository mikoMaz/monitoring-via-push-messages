package com.example.monitoring.core.company;

import org.springframework.stereotype.Service;

import java.util.List;

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

    @Override
    public List<CompanyDto> getCompanies() {
        return companyRepository.findAll().stream()
                .map(company -> new CompanyDto(company.getCompanyId(), company.getName()))
                .toList();
    }
}
