package com.example.paintings_app_backend.service;

import org.springframework.http.HttpStatus;

public class ServiceException extends RuntimeException {
    public final HttpStatus status;

    public ServiceException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}
