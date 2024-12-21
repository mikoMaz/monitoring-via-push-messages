package com.example.monitoring.core.user;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class UserInfoController {

    @GetMapping("/userInfo")
    public UserInfo test(@AuthenticationPrincipal(expression = "claims['email']") String email) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String fullRole = authentication.getAuthorities().iterator().next().getAuthority();
        String strippedRole = fullRole.replace("ROLE_", "");

        return new UserInfo(email, strippedRole);
    }
}
