package com.example.monitoring.core.user;

import java.util.List;

public interface UserService {
    List<UserDto> getUsersByCompanyId(Long companyId);

    void createUser(UserDtoBasic userDtoBasic);

    Role getUserRoleById(Long userId);

    void updateUserFromUserDto(UserDto user);

    Role getUserRole();

    boolean isSuperAdmin();

    UserDto getUserDto();

    boolean hasRightToTheCompany(Long companyId);

    void deleteUserById(Long userId);

    void deleteUserByEmail(String email);
}
