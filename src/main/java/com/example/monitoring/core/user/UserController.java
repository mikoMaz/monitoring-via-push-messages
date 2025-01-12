package com.example.monitoring.core.user;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    final private UserService userService;

    @PostMapping("/create")
    public void createUser(@RequestBody UserDtoBasic user) {
        userService.createUser(user);
    }
}
