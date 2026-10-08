package com.example.salle_sport.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.salle_sport.entity.Activite;
import com.example.salle_sport.service.ActiviteService;

@RestController
@RequestMapping("/api/activites")
@CrossOrigin(origins = "http://localhost:4200")
public class ActiviteController {

    private final ActiviteService activiteService;

    public ActiviteController(ActiviteService activiteService) {
        this.activiteService = activiteService;
    }

    // =========================
    // AFFICHER TOUTES LES ACTIVITÉS
    // =========================

    @GetMapping
    public ResponseEntity<List<Activite>> getAll() {

        return ResponseEntity.ok(
                activiteService.getAll()
        );
    }


    // =========================
    // AFFICHER UNE ACTIVITÉ
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<Activite> getById(
            @PathVariable Long id
    ) {

        return activiteService.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.notFound().build()
                );
    }


    // =========================
    // AJOUTER UNE ACTIVITÉ
    // =========================

    @PostMapping
    public ResponseEntity<Activite> create(
            @RequestBody Activite activite
    ) {

        Activite nouvelleActivite =
                activiteService.create(activite);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(nouvelleActivite);
    }


    // =========================
    // MODIFIER UNE ACTIVITÉ
    // =========================

    @PutMapping("/{id}")
    public ResponseEntity<Activite> update(
            @PathVariable Long id,
            @RequestBody Activite activite
    ) {

        try {

            Activite activiteModifiee =
                    activiteService.update(id, activite);

            return ResponseEntity.ok(
                    activiteModifiee
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }


    // =========================
    // SUPPRIMER UNE ACTIVITÉ
    // =========================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id
    ) {

        try {

            activiteService.delete(id);

            return ResponseEntity.noContent().build();

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

}