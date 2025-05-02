package com.goalplanningapp.backend.service;

import java.util.List;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.goalplanningapp.backend.dto.RoadmapRequest;
import com.goalplanningapp.backend.dto.StepRequest;
import com.goalplanningapp.backend.model.Roadmap;
import com.goalplanningapp.backend.model.Step;
import com.goalplanningapp.backend.model.User;
import com.goalplanningapp.backend.repository.RoadmapRepository;

@Service
public class RoadmapService {
    RoadmapRepository roadmapRepository;

    public RoadmapService(RoadmapRepository roadmapRepository) {
        this.roadmapRepository = roadmapRepository;
    }

    public void createRoadmap(RoadmapRequest request, User user) {
        Roadmap roadmap = new Roadmap();
        roadmap.setTitle(request.getTitle());
        roadmap.setUser(user);
        List<Step> steps = new ArrayList<>();

        for (StepRequest stepRequest : request.getSteps()) {
            Step step = new Step();
            step.setTitle(stepRequest.getTitle());
            step.setDescription(stepRequest.getDescription());
            step.setRoadmap(roadmap);
            steps.add(step);
        }
        

    }

    public List<Roadmap> loadRoadmaps(User user) {
        List<Roadmap> roadmaps = roadmapRepository.findByUser(user).orElseThrow(() -> new RuntimeException("User is not associated with any roadmap."));
        return roadmaps;
    }
}
