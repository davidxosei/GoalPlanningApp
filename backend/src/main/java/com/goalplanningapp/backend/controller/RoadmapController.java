package com.goalplanningapp.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.goalplanningapp.backend.dto.RoadmapRequest;
import com.goalplanningapp.backend.model.Roadmap;
import com.goalplanningapp.backend.model.User;
import com.goalplanningapp.backend.service.RoadmapService;

@RestController
@RequestMapping("/api/roadmaps")
public class RoadmapController {
    RoadmapService roadmapService;

    public RoadmapController(RoadmapService roadmapService) {
        this.roadmapService = roadmapService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createRoadmap(@RequestBody RoadmapRequest request, @AuthenticationPrincipal User user) {
        try {
            roadmapService.createRoadmap(request, user);
            return ResponseEntity.ok("Roadmap saved");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        
    }

    @GetMapping("/load")
    public ResponseEntity<?> loadRoadmap(@AuthenticationPrincipal User user) {
        try {
            List<Roadmap> roadmaps = roadmapService.loadRoadmaps(user);
            return ResponseEntity.ok(roadmaps);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
