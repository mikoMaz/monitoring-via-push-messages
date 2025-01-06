package com.example.monitoring.core.company;

import com.example.monitoring.core.user.UserDto;
import com.example.monitoring.core.user.UserService;
import com.example.monitoring.core.user.exceptions.UserNotFoundException;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.monitoring.core.api.config.PreviewAuthenticationFilter.encryptionKey;

@Service
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;

    private final UserService userService;

    org.slf4j.Logger logger = LoggerFactory.getLogger(CompanyServiceImpl.class);

    public CompanyServiceImpl(CompanyRepository companyRepository, UserService userService) {
        this.companyRepository = companyRepository;
        this.userService = userService;
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

    @Override
    public void updateUsersInCompany(Long companyId, List<UserDto> usersChangesToUpdate) {
        usersChangesToUpdate.forEach(userToUpdate -> {
            try {
                userService.updateUserFromUserDto(userToUpdate);
            } catch (UserNotFoundException e) {
                logger.error("User with id {} from {} company not found", userToUpdate.getId(), userToUpdate.getCompanyId());
            }
        });
    }
}
