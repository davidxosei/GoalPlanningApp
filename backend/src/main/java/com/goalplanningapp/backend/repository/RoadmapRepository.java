package com.goalplanningapp.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.goalplanningapp.backend.model.Roadmap;
import com.goalplanningapp.backend.model.User;

@Repository
public interface RoadmapRepository extends JpaRepository<Roadmap, Long> {
    Optional<Roadmap> findByUser(User user);
}
