package com.example.monitoring.core.user;

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

    @Override
    public List<UserDto> getUsersByCompanyId(Long companyId) {
        return userRepository.findUsersByCompanyCompanyId(companyId).stream()
                .map(user -> new UserDto(user.getId(), user.getName(), user.getSurname(), user.getCompany().getCompanyId(), user.getRole()))
                .toList();
    }

    @Override
    public void createUser(User user) {
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
        return new UserDto(user.getId(), user.getName(), user.getSurname(), user.getCompany().getCompanyId(), user.getRole());
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
}
