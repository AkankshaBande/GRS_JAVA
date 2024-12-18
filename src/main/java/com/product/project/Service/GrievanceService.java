package com.product.project.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Optional;
import com.cloudinary.utils.ObjectUtils;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.cloudinary.Cloudinary;
import com.product.project.Entity.Employee;
import com.product.project.Entity.GrievanceEntity;
import com.product.project.Repository.EmployeeRepo;
import com.product.project.Repository.GrievanceRepository;
import com.product.project.Repository.UserRepo;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class GrievanceService {

    @Autowired
    private GrievanceRepository grievanceRepository;

    @Autowired
    private Cloudinary cloudinary;
    
    @Autowired
    private EmployeeRepo employeeRepo;  // Repository for Employee entity (added this line)


    @SuppressWarnings("rawtypes")
    private String uploadImageToCloudinary(MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            Map uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
            return uploadResult.get("url").toString();
        } else {
            return null;
        }
    }

    public GrievanceEntity saveGrievance(GrievanceEntity grievance, MultipartFile document) throws IOException {
        grievance.setDate(LocalDate.now());  // Automatically set the current date
        if (document != null && !document.isEmpty()) {
            String documentUrl = uploadImageToCloudinary(document);
            grievance.setDocument(documentUrl);
        }
        return grievanceRepository.save(grievance);
    }
    
    public GrievanceEntity updateGrievance(Long id, GrievanceEntity grievanceEntity) {
        grievanceEntity.setId(id);
        return grievanceRepository.save(grievanceEntity);
    }
    // Get all grievances
    public List<GrievanceEntity> getAllGrievances() {
        List<GrievanceEntity> grievances = grievanceRepository.findAll();
        System.out.println("Number of grievances retrieved: " + grievances.size());
        grievances.forEach(grievance -> System.out.println(grievance.toString()));  // Log each grievance
        return grievances;
    }

    // Get grievance by ID
    public Optional<GrievanceEntity> getGrievanceById(Long id) {
        return grievanceRepository.findById(id);
    }

    // Delete grievance by ID
    public void deleteGrievance(Long id) {
        grievanceRepository.deleteById(id);
    }

//	public List<GrievanceEntity> getGrievancesByComplainantName(String complainantName) {
//		// TODO Auto-generated method stub
//		return grievanceRepository.findByComplainantName(complainantName);
//	}
	
	 // Fetch grievances by employee name (added functionality)
 // Method to get grievances by employee name
    public List<GrievanceEntity> getGrievancesByEmployeeName(String employeeName) {
        // Find the employee by their name
        Employee employee = employeeRepo.findByEmployeeName(employeeName).orElse(null);
        
        if (employee != null) {
            // Fetch grievances related to the employee
            return grievanceRepository.findByEmployeeEmployeeName(employee.getEmployeeName());
        }
        
        return Collections.emptyList();  // Return empty if no employee found
    }
    
 // Update grievance status (added functionality)
    public GrievanceEntity updateGrievanceStatus(Long grievanceId, String status) {
        Optional<GrievanceEntity> grievanceOptional = grievanceRepository.findById(grievanceId);
        
        if (grievanceOptional.isPresent()) {
            GrievanceEntity grievance = grievanceOptional.get();
            grievance.setStatus(status);
            return grievanceRepository.save(grievance);
        } else {
            return null;
        }
    }
    
    public String transferGrievanceByName(Long grievanceId, String newEmployeeName) {
        // Find the grievance by ID
        Optional<GrievanceEntity> optionalGrievance = grievanceRepository.findById(grievanceId);
        if (optionalGrievance.isEmpty()) {
            return "Grievance not found!";
        }
        
        // Find the employee by name
        Optional<Employee> optionalEmployee = employeeRepo.findByEmployeeName(newEmployeeName);
        if (optionalEmployee.isEmpty()) {
            return "Employee not found!";
        }

        // Update grievance with new employee
        GrievanceEntity grievance = optionalGrievance.get();
        grievance.setEmployee(optionalEmployee.get());

        // Save the updated grievance
        grievanceRepository.save(grievance);

        return "Grievance successfully transferred to " + newEmployeeName;
    }

    public void transferGrievanceById(Long grievanceId, Long newEmployeeId) {
        GrievanceEntity grievance = grievanceRepository.findById(grievanceId)
                .orElseThrow(() -> new RuntimeException("Grievance not found"));

        Employee newEmployee = employeeRepo.findById(newEmployeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        grievance.setEmployee(newEmployee);
        grievanceRepository.save(grievance);
    }
   
    
 // In GrievanceService class
    public void updateGrievanceStatusAndEmployee(GrievanceEntity grievance) {
        // Update logic here
        grievanceRepository.save(grievance);  // Assuming you have a repository for persistence
    }

    
    
    
}









