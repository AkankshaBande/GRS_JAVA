package com.product.project.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.product.project.Entity.GrievanceStatusEntity;
import com.product.project.Repository.GrievanceStatusRepository;

@Service
public class GrievanceStatusService {
    @Autowired
    private GrievanceStatusRepository grievanceStatusRepository;

    public GrievanceStatusEntity saveGrievanceStatus(GrievanceStatusEntity grievanceStatus) {
        return grievanceStatusRepository.save(grievanceStatus);
    }

    public List<GrievanceStatusEntity> getAllStatuses() {
        return grievanceStatusRepository.findAll();
    }
}
