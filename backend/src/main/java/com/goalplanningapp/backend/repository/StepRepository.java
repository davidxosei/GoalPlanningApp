package com.goalplanningapp.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.goalplanningapp.backend.model.Roadmap;
import com.goalplanningapp.backend.model.Step;

public interface StepRepository extends JpaRepository<Step, Long> {
    Optional<Step> findById(Long id);

    Optional<Step> findByRoadmap(Roadmap roadmap);
}
