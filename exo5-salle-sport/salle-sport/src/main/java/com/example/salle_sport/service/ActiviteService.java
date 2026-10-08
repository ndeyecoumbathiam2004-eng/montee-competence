package com.example.salle_sport.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.salle_sport.entity.Activite;
import com.example.salle_sport.repository.ActiviteRepository;

@Service
public class ActiviteService {

    private final ActiviteRepository activiteRepository;

    public ActiviteService(ActiviteRepository activiteRepository) {
        this.activiteRepository = activiteRepository;
    }

    public List<Activite> getAll() {
        return activiteRepository.findAll();
    }

    public Optional<Activite> getById(Long id) {
        return activiteRepository.findById(id);
    }

    public Activite create(Activite activite) {
        return activiteRepository.save(activite);
    }

    public Activite update(Long id, Activite activite) {

        Activite existante = activiteRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Activité introuvable avec l'id : " + id)
                );

        existante.setNom(activite.getNom());
        existante.setDescription(activite.getDescription());
        existante.setDuree(activite.getDuree());

        return activiteRepository.save(existante);
    }

    public void delete(Long id) {

        if (!activiteRepository.existsById(id)) {
            throw new RuntimeException(
                    "Activité introuvable avec l'id : " + id
            );
        }

        activiteRepository.deleteById(id);
    }
}