package com.goalplanningapp.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.goalplanningapp.backend.dto.RoadmapDeleteRequest;
import com.goalplanningapp.backend.dto.RoadmapRequest;
import com.goalplanningapp.backend.dto.StepDeleteRequest;
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

    @DeleteMapping("/delete/roadmap")
    public ResponseEntity<?> deleteRoadmap(@RequestBody RoadmapDeleteRequest request, @AuthenticationPrincipal User user) {
        try {
            roadmapService.deleteRoadmap(request.getId(), user);
            return ResponseEntity.ok(Map.of("message","Roadmap deleted"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/step")
    public ResponseEntity<?> deleteStep(@RequestBody StepDeleteRequest request, @AuthenticationPrincipal User user) {
        try {
            roadmapService.deleteStep(request.getId(), user);
            return ResponseEntity.ok(Map.of("message", "Step deleted"));
        }
        catch(RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}
