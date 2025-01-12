package com.example.monitoring.core.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDtoBasic {

    private String name;

    private String surname;

    private Long companyId;

    private String email;
}
