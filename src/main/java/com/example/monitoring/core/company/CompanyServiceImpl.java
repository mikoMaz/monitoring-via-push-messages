package com.example.monitoring.core.company;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import static com.example.monitoring.core.api.config.PreviewAuthenticationFilter.encryptionKey;
import com.example.monitoring.core.user.Role;
import com.example.monitoring.core.user.UserDto;
import com.example.monitoring.core.user.UserService;
import com.example.monitoring.core.user.exceptions.UserNotFoundException;

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
    public Company findCompanyByName(String companyName)   
{
    return companyRepository.findCompanyByName(companyName);
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
    public void setCompanyKey(Long companyId, String newCompanyKey) throws Exception {
        Optional<Company> company = companyRepository.findById(companyId);

        if (company.isEmpty()) {
            throw new IllegalArgumentException("Company not found");
        }

        String encryptedKey = EncryptionUtil.encrypt(newCompanyKey, encryptionKey);
        company.get().setEncryptedKey(encryptedKey);
        companyRepository.save(company.get());
    }

    @Override
    public List<CompanyDto> getCompanies() {
        UserDto userDto = userService.getUserDto();
        Role userRole = userDto.getRole();

        if (userRole == Role.SUPER_ADMIN) {
            return companyRepository.findAll().stream()
                    .map(company -> new CompanyDto(company.getCompanyId(), company.getName()))
                    .toList();
        }
        if (userRole == Role.ADMIN || userRole == Role.READ_ONLY) {
            return companyRepository.findAll().stream()
                    .map(company -> new CompanyDto(company.getCompanyId(), company.getName()))
                    .filter(company -> Objects.equals(userDto.getCompanyId(), company.getCompanyId()))
                    .toList();
        }
        throw new IllegalArgumentException("User has not enough permissions");
    }

    @Override
    public Company getCompanyByNameAndEncryptedKey(String companyName, String encryptedKey) {
        return companyRepository.getCompanyByNameAndEncryptedKey(companyName, encryptedKey);
    }

    @Override
    public void updateUsersInCompany(Long companyId, List<UserDto> usersChangesToUpdate) {
        UserDto currentUser = userService.getUserDto();
        Role currentUserRole = currentUser.getRole();

        usersChangesToUpdate.forEach(userToUpdate -> {
            try {
                // prevent changing own role
                if (Objects.equals(currentUser.getId(), userToUpdate.getId())) {
                    userToUpdate.setRole(currentUserRole);
                }
                // user to change is SUPER_ADMIN and current user (not SUPER_ADMIN) wants to OP
                // the user
                if (userToUpdate.getRole() == Role.SUPER_ADMIN && currentUserRole != Role.SUPER_ADMIN
                        && userService.getUserRoleById(userToUpdate.getId()) != Role.SUPER_ADMIN) {
                    throw new IllegalArgumentException("User has not enough permissions");
                }
                userService.updateUserFromUserDto(userToUpdate);
            } catch (UserNotFoundException e) {
                logger.error("User with id {} from {} company not found", userToUpdate.getId(),
                        userToUpdate.getCompanyId());
            } catch (IllegalArgumentException e) {
                logger.error("Not enough permissions to change this role");
            }
        });
    }

    @Override
    public Optional<Company> findCompanyById(Long companyId) {
        return companyRepository.findById(companyId);
    }
}
