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
import com.goalplanningapp.backend.repository.StepRepository;

@Service
public class RoadmapService {
    RoadmapRepository roadmapRepository;
    StepRepository stepRepository;

    public RoadmapService(RoadmapRepository roadmapRepository, StepRepository stepRepository) {
        this.roadmapRepository = roadmapRepository;
        this.stepRepository = stepRepository;
    }

    public void createRoadmap(RoadmapRequest request, User user) {
        try {
            Roadmap roadmap = new Roadmap();
            List<Step> steps = new ArrayList<>();
            try {
                
                roadmap.setTitle(request.getTitle());
                roadmap.setUser(user);
                
            }
            catch(RuntimeException e) {
                throw new RuntimeException("Error occurs during roadmap creation");
            }
            
            try {
                for (StepRequest stepRequest : request.getSteps()) {
                    Step step = new Step();
                    step.setTitle(stepRequest.getTitle());
                    step.setDescription(stepRequest.getDescription());
                    step.setRoadmap(roadmap);
                    steps.add(step);
                    roadmap.setSteps(steps);
                }
            }
            catch(RuntimeException e) {
                throw new RuntimeException("Error occurs during step creation");
            }
            
            try {
                roadmapRepository.save(roadmap);
            } catch (Exception e) {
                throw new RuntimeException("Error occurs when trying to save roadmap");
            }
            
        } catch (Exception e) {
            throw new RuntimeException("Error saving roadmap.");
        }
        

    }

    public List<Roadmap> loadRoadmaps(User user) {
        List<Roadmap> roadmaps = roadmapRepository.findByUser(user).orElseThrow(() -> new RuntimeException("User is not associated with any roadmap."));
        return roadmaps;
    }

    public void deleteRoadmap(Long id, User user) {
        Roadmap roadmap = roadmapRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Roadmap not found"));
    
        if (!roadmap.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not authorized to delete this roadmap.");
        }
    
        roadmapRepository.delete(roadmap);
    }

    public void deleteStep(Long id, User user) {
        Step step = stepRepository.findById(id).orElseThrow(() -> new RuntimeException("Step with id"+ id+ "not found"));
        if(!step.getRoadmap().getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not authorized to delete this step.");
        }
        stepRepository.delete(step);
    }
    
}
