package com.goalplanningapp.backend.controller;

import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.goalplanningapp.backend.auth.AuthenticationService;
import com.goalplanningapp.backend.auth.JwtAuthenticationResponse;
import com.goalplanningapp.backend.dto.AuthenticationRequest;
import com.goalplanningapp.backend.dto.RegisterRequest;
import com.goalplanningapp.backend.model.User;

@RestController
@RequestMapping("/api/users")

public class UserController {

    private final AuthenticationService authenticationService;

    public UserController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest request) {
        try {
            JwtAuthenticationResponse tokens = authenticationService.authenticate(request);
            return ResponseEntity.ok(tokens);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            JwtAuthenticationResponse tokens = authenticationService.register(request);
            return ResponseEntity.ok(tokens);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/username")
    public ResponseEntity<HashMap<String, String>> username(@AuthenticationPrincipal User user) {
        HashMap<String, String> username = authenticationService.getUsername(user);
        return ResponseEntity.ok(username);

    }

}
