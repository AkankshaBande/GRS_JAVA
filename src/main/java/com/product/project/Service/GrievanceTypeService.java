package com.product.project.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.product.project.Entity.GrievanceTypeEntity;
import com.product.project.Repository.GrievanceTypeRepository;

@Service
public class GrievanceTypeService {
    @Autowired
    private GrievanceTypeRepository grievanceTypeRepository; 

    public GrievanceTypeEntity saveGrievanceType(GrievanceTypeEntity grievanceType) {
        return grievanceTypeRepository.save(grievanceType);
    }

    public List<GrievanceTypeEntity> getAllGrievanceTypes() {
        return grievanceTypeRepository.findAll();
    }

    // public Optional<GrievanceTypeEntity> getGrievanceTypeById(int id) {
    //     return grievanceTypeRepository.findById(id);
    // }

    public GrievanceTypeEntity updateGrievanceType(int id, GrievanceTypeEntity updatedGrievanceType) {
        Optional<GrievanceTypeEntity> existingGrievanceType = grievanceTypeRepository.findById(id);
        if (existingGrievanceType.isPresent()) {
            GrievanceTypeEntity grievanceType = existingGrievanceType.get();
            grievanceType.setType(updatedGrievanceType.getType());
            return grievanceTypeRepository.save(grievanceType);
        } else {
            return null;
        }
    }

    public boolean deleteGrievanceType(int id) {
        Optional<GrievanceTypeEntity> existingGrievanceType = grievanceTypeRepository.findById(id);
        if (existingGrievanceType.isPresent()) {
            grievanceTypeRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
