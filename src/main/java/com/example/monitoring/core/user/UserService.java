package com.example.monitoring.core.user;

import java.util.List;

public interface UserService {
    List<UserDto> getUsersByCompanyId(Long companyId);
    void updateUserFromUserDto(UserDto user);
}
