package com.goalplanningapp.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.goalplanningapp.backend.model.Step;

public interface StepRepository extends JpaRepository<Step, Long> {
    Optional<Step> findById();

    Optional<Step> findByRoadmap();
}
