package com.example.monitoring.core.company;

import com.example.monitoring.core.user.UserDto;

import java.util.List;

public interface CompanyService {
    void setCompanyKey(String companyName, String companyKey) throws Exception;
    List<CompanyDto> getCompanies();
    void updateUsersInCompany(Long companyId, List<UserDto> users);
}
