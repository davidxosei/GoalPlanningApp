package com.goalplanningapp.backend.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoadmapRequest {
    private String title;
    private List<StepRequest> steps;
}
