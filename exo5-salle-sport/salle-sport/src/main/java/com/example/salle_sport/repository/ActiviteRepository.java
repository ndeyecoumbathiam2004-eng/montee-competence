package com.example.salle_sport.repository;

import com.example.salle_sport.entity.Activite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActiviteRepository extends JpaRepository<Activite, Long> {
}