package com.product.project.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.product.project.Entity.DepartmentEntity;
import com.product.project.Entity.Employee;
import com.product.project.Entity.GrievanceEntity;
import com.product.project.Entity.TransferRequest;
import com.product.project.Repository.DepartmentRepository;
import com.product.project.Repository.EmployeeRepo;
import com.product.project.Service.GrievanceService;


import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/grievance")
@CrossOrigin(origins = "*")  // URL where your React app runs
public class GrievanceController {

    @Autowired
    private GrievanceService grievanceService;
    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private DepartmentRepository departmentRepo;

    @PostMapping("/add")
    public ResponseEntity<String> createGrievance(
            @RequestParam("department") String department,
            @RequestParam("designation") String designation,
            @RequestParam("employeeName") String employeeName,
            @RequestParam("complainantName") String complainantName,
            @RequestParam("aadhaarNo") String aadhaarNo,
            @RequestParam("mobileNo") String mobileNo,
            @RequestParam("taluka") String taluka,
            @RequestParam("village") String village,
            @RequestParam("type") String type,
            @RequestParam(value = "document", required = false) MultipartFile document) {
        
        try {
        	
        	System.out.println("Received request to add grievance for employee: " + employeeName);
            
        	
            // Validate input fields (optional but recommended)
            if (aadhaarNo.length() != 12) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Aadhaar number");
            }
            if (mobileNo.length() != 10) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Mobile number");
            }
            
            // Find the Employee by employeeName
            Employee employee = employeeRepo.findByEmployeeName(employeeName).orElse(null);
            if (employee == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Employee not found");
            }
            
            DepartmentEntity departmentEntity = departmentRepo.findByDepartmentName(department);
            if (departmentEntity == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Department not found");
            }

            // Create GrievanceEntity object and set fields
            GrievanceEntity grievance = new GrievanceEntity();
            grievance.setDepartment(departmentEntity);
            grievance.setDesignation(designation);
            grievance.setEmployee(employee);
            grievance.setComplainantName(complainantName);
            grievance.setAadhaarNo(aadhaarNo);
            grievance.setMobileNo(mobileNo);
            grievance.setTaluka(taluka);
            grievance.setVillage(village);
            grievance.setType(type);
            grievance.setDate(LocalDate.now());  // Set current date
            grievance.setStatus("pending");  // Set the default status

            // Save the grievance and document (if provided)
            grievanceService.saveGrievance(grievance, document);

            return ResponseEntity.ok("Grievance Added Successfully");

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to upload document");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add grievance");
        }
    }


    // Get all Grievances
    @GetMapping("/getAll")
    public ResponseEntity<List<GrievanceEntity>> getAllGrievances() {
        List<GrievanceEntity> grievances = grievanceService.getAllGrievances();
        
        System.out.println("Number of grievances retrieved: " + grievances.size());
        grievances.forEach(grievance -> System.out.println(grievance.toString()));  // Log each grievance
        
        if (grievances.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(grievances);
        }
        return ResponseEntity.ok(grievances);
    }

    // Get a Grievance by ID
    @GetMapping("/{id}")
    public ResponseEntity<GrievanceEntity> getGrievanceById(@PathVariable Long id) {
        Optional<GrievanceEntity> grievance = grievanceService.getGrievanceById(id);
        return grievance.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    // Update an existing grievance
    @PutMapping("/{id}")
    public ResponseEntity<String> updateGrievance(
    		@PathVariable("id") Long id, @RequestBody GrievanceEntity grievanceEntity) {
        
        try {
            GrievanceEntity updatedGrievance = grievanceService.updateGrievance(id, grievanceEntity);
            return ResponseEntity.ok("Grievance Updated Successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Grievance not found");
        }
    }
    
 // Fetch grievances by complainantName
//    @GetMapping("/getByComplainantName")
//    public ResponseEntity<List<GrievanceEntity>> getGrievancesByComplainantName(@RequestParam String complainantName) {
//        List<GrievanceEntity> grievances = grievanceService.getGrievancesByComplainantName(complainantName);
//        if (grievances.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(grievances);
//        }
//        return ResponseEntity.ok(grievances);
//    }

    // Delete a Grievance by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGrievance(@PathVariable Long id) {
        try {
            grievanceService.deleteGrievance(id);
            return ResponseEntity.ok("Grievance Deleted Successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Grievance not found");
        }
    }
    
 // Fetch grievances by employee name
    @GetMapping("/employee/{employeeName}")
    public ResponseEntity<List<GrievanceEntity>> getGrievancesByEmployeeName(@PathVariable String employeeName) {
        List<GrievanceEntity> grievances = grievanceService.getGrievancesByEmployeeName(employeeName);
        return new ResponseEntity<>(grievances, HttpStatus.OK);
    }
    
 // Update grievance status
//    @PutMapping("/status/{grievanceId}")
//    public ResponseEntity<GrievanceEntity> updateGrievanceStatus(@PathVariable Long grievanceId, @RequestParam String newStatus) {
//        System.out.println("Updating status for grievance ID: " + grievanceId + " to " + newStatus);
//        GrievanceEntity updatedGrievance = grievanceService.updateGrievanceStatus(grievanceId, newStatus);
//        return new ResponseEntity<>(updatedGrievance, HttpStatus.OK);
//    }
    
    @PutMapping("/status/{grievanceId}")
    public ResponseEntity<String> updateGrievanceStatus(
        @PathVariable Long grievanceId, 
        @RequestParam String newStatus) {

        // Assuming you have a service that updates the grievance status
        GrievanceEntity grievance = grievanceService.updateGrievanceStatus(grievanceId, newStatus);

        if (grievance != null) {
            return ResponseEntity.ok("Status updated successfully");
        } else {
            return ResponseEntity.status(404).body("Grievance not found");
        }
    }
    
    
    @PutMapping("/s/{grievanceId}")
    public ResponseEntity<String> updateGrievanceStatus(
            @PathVariable Long grievanceId, 
            @RequestParam String newStatus,
            @RequestParam String newEmployeeName) {

        // Retrieve grievance by ID
        Optional<GrievanceEntity> optionalGrievance = grievanceService.getGrievanceById(grievanceId);
        
        if (!optionalGrievance.isPresent()) {
            return ResponseEntity.status(404).body("Grievance not found");
        }

        GrievanceEntity grievance = optionalGrievance.get();

        // Find the new employee by employee name
        Optional<Employee> optionalEmployee = employeeRepo.findByEmployeeName(newEmployeeName);
        
        if (!optionalEmployee.isPresent()) {
            return ResponseEntity.status(404).body("Employee not found");
        }

        Employee newEmployee = optionalEmployee.get();

        // Update the grievance status and associate the new employee
        grievance.setStatus(newStatus);
        grievance.setEmployee(newEmployee);

        // Call the renamed service method
        grievanceService.updateGrievanceStatusAndEmployee(grievance);

        return ResponseEntity.ok("Grievance status and employee updated successfully");
    }

    
    @PutMapping("/{grievanceId}/transfer/{newEmployeeId}")
    public ResponseEntity<String> transferGrievance(
            @PathVariable Long grievanceId,
            @PathVariable Long newEmployeeId) {
        try {
            grievanceService.transferGrievanceById(grievanceId, newEmployeeId);
            return ResponseEntity.ok("Grievance transferred successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }


}
