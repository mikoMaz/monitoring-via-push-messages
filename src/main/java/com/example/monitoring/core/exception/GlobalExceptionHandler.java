package com.example.monitoring.core.exception;

import com.example.monitoring.core.user.exceptions.UserAlreadyExistsException;
import com.example.monitoring.core.user.exceptions.UserCredentialsValidationException;
import com.example.monitoring.core.user.exceptions.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Void> handleUserNotFoundException(UserNotFoundException e) {
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<Void> handleUserAlreadyExistsException(UserAlreadyExistsException e) {
        return ResponseEntity.badRequest().build();
    }

    @ExceptionHandler(UserCredentialsValidationException.class)
    public ResponseEntity<Void> handleUserCredentialsValidationException(UserCredentialsValidationException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }
}
