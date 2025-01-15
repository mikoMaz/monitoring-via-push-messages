package com.example.monitoring.core.external.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class FileCorruptionException extends RuntimeException {

    public FileCorruptionException() {
        super();
    }

    public FileCorruptionException(String message) {
        super(message);
    }
}
