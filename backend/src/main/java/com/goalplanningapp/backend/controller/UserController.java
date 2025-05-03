package com.goalplanningapp.backend.controller;

import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.goalplanningapp.backend.auth.JwtAuthenticationResponse;
import com.goalplanningapp.backend.dto.AuthenticationRequest;
import com.goalplanningapp.backend.dto.RegisterRequest;
import com.goalplanningapp.backend.model.User;
import com.goalplanningapp.backend.service.AuthenticationService;
import com.goalplanningapp.backend.service.JwtService;

@RestController
@RequestMapping("/api/users")

public class UserController {

    private final AuthenticationService authenticationService;
    private final JwtService jwtService;

    public UserController(AuthenticationService authenticationService, JwtService jwtService) {
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
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

    @GetMapping("/refresh")
    public ResponseEntity<?> refresh(@AuthenticationPrincipal User user) {
        try {
            String accessToken = jwtService.generateAccessToken(user);
            HashMap<String, String> newAccessToken = new HashMap<>();
            newAccessToken.put("newAccessToken", accessToken);
            return ResponseEntity.ok(newAccessToken);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }
        

    }

}
