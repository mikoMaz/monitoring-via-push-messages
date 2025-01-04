package com.example.monitoring.core.company;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user/company")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping("/change-company-password")
    public void changeCompanyPassword(@RequestParam String company, @RequestParam String password) throws Exception {
        companyService.setCompanyKey(company, password);
    }
}
