package com.product.project.Service;

import com.product.project.Entity.GrievanceEntity1;
import com.product.project.Repository.GrievanceRepository1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GrievanceService1 {

    @Autowired
    private GrievanceRepository1 grievanceRepository;

    public List<GrievanceEntity1> getAllGrievances() {
        return grievanceRepository.findAll();
    }

    public GrievanceEntity1 getGrievanceById(int id) {
        Optional<GrievanceEntity1> grievance = grievanceRepository.findById(id);
        return grievance.orElse(null); // Handle not found case as needed
    }

    public GrievanceEntity1 createGrievance(GrievanceEntity1 grievanceEntity) {
        return grievanceRepository.save(grievanceEntity);
    }

    public GrievanceEntity1 updateGrievance(int id, GrievanceEntity1 grievanceEntity) {
        grievanceEntity.setGrievanceId(id);
        return grievanceRepository.save(grievanceEntity);
    }

    public void deleteGrievance(int id) {
        grievanceRepository.deleteById(id);
    }
}




