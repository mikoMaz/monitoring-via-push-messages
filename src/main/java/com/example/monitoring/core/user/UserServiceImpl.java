package com.example.monitoring.core.user;

import com.example.monitoring.core.user.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
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
}
