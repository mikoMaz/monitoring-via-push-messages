package com.example.monitoring.core.company;

import java.util.List;

import com.example.monitoring.core.user.UserDto;

public interface CompanyService {
    void createCompany(String companyName);

    void setCompanyKey(String companyName, String companyKey) throws Exception;

    void setCompanyKey(Long companyId, String companyKey) throws Exception;

    List<CompanyDto> getCompanies();

    void updateUsersInCompany(Long companyId, List<UserDto> users);

    Company getCompanyByNameAndEncryptedKey(String companyName, String encryptedKey);
    Company findCompanyByName(String companyName);
}
