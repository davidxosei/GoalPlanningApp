package com.goalplanningapp.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.goalplanningapp.backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findById(Long id);
    Optional<User> findByUsername(String username);
    Optional<User> findByLowerUsername(String lowerUsername);
}
