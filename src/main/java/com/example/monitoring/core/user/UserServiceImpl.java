package com.example.monitoring.core.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<UserDto> getUsersByCompanyId(Long companyId) {
        return userRepository.findUsersByCompanyCompanyId(companyId).stream()
                .map(user -> new UserDto(user.getId(), user.getName(), user.getSurname(), user.getRole()))
                .toList();
    }
}
