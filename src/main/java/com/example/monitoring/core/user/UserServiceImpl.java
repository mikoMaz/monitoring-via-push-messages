package com.example.monitoring.core.user;

import com.example.monitoring.core.company.Company;
import com.example.monitoring.core.company.CompanyRepository;
import com.example.monitoring.core.user.exceptions.UserAlreadyExistsException;
import com.example.monitoring.core.user.exceptions.UserCredentialsValidationException;
import com.example.monitoring.core.user.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final CompanyRepository companyRepository;

    org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    public List<UserDto> getUsersByCompanyId(Long companyId) {
        return userRepository.findUsersByCompanyCompanyId(companyId).stream()
                .map(user -> new UserDto(user.getId(), user.getName(), user.getSurname(),
                        user.getCompany().getCompanyId(), user.getRole()))
                .toList();
    }

    @Override
    public void createUser(UserDtoBasic userDtoBasic) {
        validateUserDtoBasic(userDtoBasic);
        Optional<Company> company = companyRepository.findById(userDtoBasic.getCompanyId());

        User user = new User();
        user.setName(userDtoBasic.getName());
        user.setSurname(userDtoBasic.getSurname());
        user.setEmail(userDtoBasic.getEmail());
        user.setCompany(company.get());
        user.setRole(Role.READ_ONLY);

        userRepository.save(user);
    }

    @Override
    public Role getUserRoleById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return user.get().getRole();
        }
        throw new UserNotFoundException("User not found");
    }

    @Override
    public void updateUserFromUserDto(UserDto user) {
        Optional<User> userToUpdate = userRepository.findById(user.getId());
        if (userToUpdate.isEmpty()) {
            throw new UserNotFoundException("User not found");
        }

        userToUpdate.get().setName(user.getName());
        userToUpdate.get().setSurname(user.getSurname());
        userToUpdate.get().setRole(user.getRole());
        userRepository.save(userToUpdate.get());
    }

    @Override
    public Role getUserRole() {
        User user = userRepository.findByAuthTokenSubject(getSubject());
        return user.getRole();
    }

    @Override
    public boolean isSuperAdmin() {
        return userRepository.findByAuthTokenSubject(getSubject()).getRole() == Role.SUPER_ADMIN;
    }

    @Override
    public UserDto getUserDto() {
        User user = userRepository.findByAuthTokenSubject(getSubject());
        return new UserDto(user.getId(), user.getName(), user.getSurname(), user.getCompany().getCompanyId(),
                user.getRole());
    }

    @Override
    public boolean hasRightToTheCompany(Long companyId) {
        User user = userRepository.findByAuthTokenSubject(getSubject());
        return user.getCompany().getCompanyId().equals(companyId) &&
                user.getRole() == Role.ADMIN ||
                user.getRole() == Role.SUPER_ADMIN;
    }

    private String getSubject() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        return jwt.getClaimAsString("sub");
    }

    private void validateUserDtoBasic(UserDtoBasic userDtoBasic) {
        if (userDtoBasic == null) {
            throw new UserCredentialsValidationException("UserDtoBasic is null");
        }

        if (userDtoBasic.getName() == null) {
            logger.error("No name in request");
            throw new UserCredentialsValidationException("Cannot save user without name");
        }

        if (userDtoBasic.getSurname() == null) {
            logger.error("No surname in request");
            throw new UserCredentialsValidationException("Cannot save user without surname");
        }

        if (userDtoBasic.getEmail() == null) {
            logger.error("No email in request");
            throw new UserCredentialsValidationException("Cannot save user without email");
        }

        if (userDtoBasic.getCompanyId() == null) {
            logger.error("No companyId in request");
            throw new UserCredentialsValidationException("Cannot save user without companyId");
        }

        Optional<User> userFromRepository = userRepository.findByEmail(userDtoBasic.getEmail());

        if (userFromRepository.isPresent()) {
            logger.error("User with {} already exists", userDtoBasic.getEmail());
            throw new UserAlreadyExistsException("User with email " + userDtoBasic.getEmail() + " already exists");
        }

        Optional<Company> company = companyRepository.findById(userDtoBasic.getCompanyId());

        if (company.isEmpty()) {
            logger.error("Company with invalid id {}", userDtoBasic.getCompanyId());
            throw new UserCredentialsValidationException("Company from user object does not exist");
        }
    }
}
