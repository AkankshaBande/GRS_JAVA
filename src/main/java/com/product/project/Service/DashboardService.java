package com.product.project.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.product.project.Entity.DepartmentEntity;
import com.product.project.Entity.EmployeeEntity;
import com.product.project.Entity.GrievanceEntity;
import com.product.project.Repository.GrievanceRepo;

import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private GrievanceRepo gr;

    public List<GrievanceEntity> getStatusWiseGrievanceCounts() {
        return gr.getStatusWiseGrievanceCounts();
    }

    public List<DepartmentEntity> getDepartmentWiseGrievanceCounts() {
        return gr.getDepartmentWiseGrievanceCounts();
    }

//    public List<EmployeeEntity> getTopPendingEmployees() {
//        return gr.getTopPendingEmployees();
//    }

    public List<Integer> getDailyGrievanceCount() {
        return gr.getDailyGrievanceCount();
    }

    public List<GrievanceEntity> getGrievanceReport(int page, int size) {
        return gr.getGrievanceReport(page, size);
    }
}
