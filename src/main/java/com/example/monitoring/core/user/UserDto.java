package com.example.monitoring.core.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDto {

    private Long id;

    private String name;

    private String surname;

    private Role role;
}
