package com.product.project.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.product.project.Entity.DepartmentEntity;
import com.product.project.Entity.EmployeeEntity;
import com.product.project.Entity.GrievanceEntity;
import com.product.project.Service.DashboardService;

import java.util.List;

@RestController
@RequestMapping("/api/ceo/dashboard")
@CrossOrigin("*")
public class Dashboardcontroller {

    @Autowired
    private DashboardService ds;
 
    @GetMapping("/grievance-status-count")
    public List<GrievanceEntity> getStatusWiseGrievanceCounts() {
        return ds.getStatusWiseGrievanceCounts();
    }
   
    @GetMapping("/department-wise-count")
    public List<DepartmentEntity> getDepartmentWiseGrievanceCounts() {
        return ds.getDepartmentWiseGrievanceCounts();
    }
   
//    @GetMapping("/top-pending-employees")
//    public List<EmployeeEntity> getTopPendingEmployees() {
//        return ds.getTopPendingEmployees();
//    }
   
    @GetMapping("/daily-grievance-count")
    public List<Integer> getDailyGrievanceCount() {
        return ds.getDailyGrievanceCount();
    }

    @GetMapping("/grievance-report")
    public List<GrievanceEntity> getGrievanceReport(@RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "10") int size) {
        return ds.getGrievanceReport(page, size);
    }
}
