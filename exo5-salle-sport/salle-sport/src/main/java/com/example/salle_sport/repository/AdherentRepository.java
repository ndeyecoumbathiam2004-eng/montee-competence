package com.example.salle_sport.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.salle_sport.entity.Adherent;

public interface AdherentRepository extends JpaRepository<Adherent, Long> {

    Optional<Adherent> findByUsername(String username);

}
