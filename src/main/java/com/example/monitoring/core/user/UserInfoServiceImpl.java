package com.example.monitoring.core.user;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserInfoServiceImpl implements UserInfoService {

    @Override
    public UserInfo getUserInfo(String email) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String fullRole = authentication.getAuthorities().iterator().next().getAuthority();
        String strippedRole = fullRole.replace("ROLE_", "");

        return new UserInfo(email, strippedRole);
    }
}
