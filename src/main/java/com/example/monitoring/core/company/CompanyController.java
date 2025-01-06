package com.example.monitoring.core.company;

import com.example.monitoring.core.user.UserDto;
import com.example.monitoring.core.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user/company")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    private final UserService userService;

    @PostMapping("/change-company-password")
    public void changeCompanyPassword(@RequestParam String company, @RequestParam String password) throws Exception {
        companyService.setCompanyKey(company, password);
    }

    @GetMapping("/get-companies")
    public List<CompanyDto> getCompanies() {  // TODO: only SUPER-ADMIN should have an access to all companies
        return companyService.getCompanies();
    }

    @GetMapping("/get-users-from-company")
    public List<UserDto> getUsersFromCompany(@RequestParam Long companyId) {
        return userService.getUsersByCompanyId(companyId);
    }

    @PutMapping("/update-company-users")
    public ResponseEntity<Void> updateCompanyUsers(@RequestParam Long companyId, @RequestBody List<UserDto> users) {
        companyService.updateUsersInCompany(companyId, users);
        return ResponseEntity.ok().build();
    }
}
