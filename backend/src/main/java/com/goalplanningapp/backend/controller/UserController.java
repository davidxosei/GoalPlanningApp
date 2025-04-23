package com.goalplanningapp.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.goalplanningapp.backend.auth.AuthenticationService;
import com.goalplanningapp.backend.dto.AuthenticationRequest;
import com.goalplanningapp.backend.dto.RegisterRequest;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private final AuthenticationService authenticationService;

    public UserController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody AuthenticationRequest request) {
        try {
            authenticationService.authenticate(request);
        } catch (Exception e) {
            System.out.println(e);
        }

        return ResponseEntity.status(HttpStatus.OK).build();
        
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody RegisterRequest request) {
        try {
            authenticationService.register(request);
        } catch (Exception e) {
            System.out.println(e);
        }
        
        return ResponseEntity.status(HttpStatus.CREATED).build();
        
    }

}
