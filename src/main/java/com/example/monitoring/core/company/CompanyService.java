package com.example.monitoring.core.company;

import java.util.List;

public interface CompanyService {
    void setCompanyKey(String companyName, String companyKey) throws Exception;
    List<CompanyDto> getCompanies();
}
