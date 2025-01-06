package com.example.monitoring.core.company;

import com.example.monitoring.core.user.Role;
import com.example.monitoring.core.user.UserDto;
import com.example.monitoring.core.user.UserService;
import com.example.monitoring.core.user.exceptions.UserNotFoundException;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

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
    public void createCompany(String companyName) {
        Company company = new Company();
        company.setName(companyName);
        companyRepository.save(company);
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
        UserDto userDto = userService.getUserDto();
        Role userRole = userDto.getRole();

        if (userRole == Role.SUPER_ADMIN) {
            return companyRepository.findAll().stream()
                    .map(company -> new CompanyDto(company.getCompanyId(), company.getName()))
                    .toList();
        } if (userRole == Role.ADMIN) {
            return companyRepository.findAll().stream()
                    .map(company -> new CompanyDto(company.getCompanyId(), company.getName()))
                    .filter(company ->
                            Objects.equals(userDto.getCompanyId(), company.getCompanyId())
                    )
                    .toList();
        }
        throw new IllegalArgumentException("User has not enough permissions");
    }

    @Override
    public void updateUsersInCompany(Long companyId, List<UserDto> usersChangesToUpdate) {
        Role userRole = userService.getUserRole();
        usersChangesToUpdate.forEach(userToUpdate -> {
            try {
                if (userToUpdate.getRole() == Role.SUPER_ADMIN && userRole != Role.SUPER_ADMIN && userService.getUserRoleById(userToUpdate.getId()) != Role.SUPER_ADMIN) {
                    throw new IllegalArgumentException("User has not enough permissions");
                }
                userService.updateUserFromUserDto(userToUpdate);
            } catch (UserNotFoundException e) {
                logger.error("User with id {} from {} company not found", userToUpdate.getId(), userToUpdate.getCompanyId());
            } catch (IllegalArgumentException e) {
                logger.error("Not enough permissions to change this role");
            }
        });
    }
}
