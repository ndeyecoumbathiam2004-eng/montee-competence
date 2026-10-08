package com.example.salle_sport.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.salle_sport.dto.AuthRequestDTO;
import com.example.salle_sport.dto.AuthResponseDTO;
import com.example.salle_sport.dto.LoginRequestDTO;
import com.example.salle_sport.entity.Adherent;
import com.example.salle_sport.repository.AdherentRepository;

@Service
public class AuthService {

    private final AdherentRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            AdherentRepository repository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponseDTO register(AuthRequestDTO dto) {

        if (repository.findByUsername(dto.getUsername()).isPresent()) {
            throw new RuntimeException("Nom d'utilisateur déjà utilisé");
        }

        Adherent adherent = new Adherent();

        adherent.setNom(dto.getNom());
        adherent.setPrenom(dto.getPrenom());
        adherent.setEmail(dto.getEmail());
        adherent.setTelephone(dto.getTelephone());
        adherent.setDateNaissance(dto.getDateNaissance());

        adherent.setUsername(dto.getUsername());
        adherent.setPassword(passwordEncoder.encode(dto.getPassword()));

        if (dto.getRole() == null || dto.getRole().isBlank()) {
            adherent.setRole("ADHERENT");
        } else {
            adherent.setRole(dto.getRole().toUpperCase());
        }

        Adherent saved = repository.save(adherent);

        String token = jwtService.generateToken(
                saved.getUsername(),
                saved.getRole()
        );

        return new AuthResponseDTO(
                token,
                saved.getUsername(),
                saved.getRole()
        );
    }

    public AuthResponseDTO login(LoginRequestDTO dto) {

        Adherent adherent = repository.findByUsername(dto.getUsername())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Nom d'utilisateur ou mot de passe incorrect"
                        ));

        if (!passwordEncoder.matches(
                dto.getPassword(),
                adherent.getPassword())) {

            throw new RuntimeException(
                    "Nom d'utilisateur ou mot de passe incorrect"
            );
        }

        String token = jwtService.generateToken(
                adherent.getUsername(),
                adherent.getRole()
        );

        return new AuthResponseDTO(
                token,
                adherent.getUsername(),
                adherent.getRole()
        );
    }
}