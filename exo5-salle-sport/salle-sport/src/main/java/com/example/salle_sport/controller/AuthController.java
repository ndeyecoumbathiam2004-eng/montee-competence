package com.example.salle_sport.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.salle_sport.dto.AuthRequestDTO;
import com.example.salle_sport.dto.AuthResponseDTO;
import com.example.salle_sport.dto.LoginRequestDTO;
import com.example.salle_sport.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(
            @Valid @RequestBody AuthRequestDTO dto) {

        AuthResponseDTO response = authService.register(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(
            @Valid @RequestBody LoginRequestDTO dto) {

        AuthResponseDTO response = authService.login(dto);

        return ResponseEntity.ok(response);
    }
}
