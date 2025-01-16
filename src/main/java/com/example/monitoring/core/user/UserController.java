package com.example.monitoring.core.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    final private UserService userService;

    @PreAuthorize("(#user != null && #user.companyId != null && @userServiceImpl.hasRightToTheCompany(#user.companyId))")
    @PostMapping("/create")
    public void createUser(@RequestBody UserDtoBasic user) {
        userService.createUser(user);
    }

    @DeleteMapping("/deleteUserById")
    public void deleteUserById(@RequestParam Long userId) {
        userService.deleteUserById(userId);
    }

    @DeleteMapping("/deleteByEmail")
    public void deleteUserByEmail(@RequestParam String email) {
        userService.deleteUserByEmail(email);
    }
}
