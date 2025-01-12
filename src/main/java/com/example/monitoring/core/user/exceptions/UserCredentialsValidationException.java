package com.example.monitoring.core.user.exceptions;

public class UserCredentialsValidationException extends RuntimeException {
    public UserCredentialsValidationException() {
        super();
    }

    public UserCredentialsValidationException(String message) {
        super(message);
    }
}
