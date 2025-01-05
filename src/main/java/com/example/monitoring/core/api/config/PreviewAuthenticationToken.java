package com.example.monitoring.core.api.config;

import org.springframework.security.authentication.AbstractAuthenticationToken;

public class PreviewAuthenticationToken extends AbstractAuthenticationToken {

    private final Object principal;

    public PreviewAuthenticationToken(Object principal) {
        super(null);
        this.principal = principal;
        setAuthenticated(false);
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return principal;
    }

    @Override
    public void setAuthenticated(boolean authenticated) {
        super.setAuthenticated(authenticated);
    }
}
