package com.product.project.Controller;

import com.product.project.Entity.GrievanceEntity1;
import com.product.project.Service.GrievanceService1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000") // or the URL where your React app runs
@RequestMapping("/grievances")
public class GrievanceController1 {

    @Autowired
    private GrievanceService1 grievanceService;

    // Get all grievances
    @GetMapping
    public ResponseEntity<List<GrievanceEntity1>> getAllGrievances() {
        List<GrievanceEntity1> grievances = grievanceService.getAllGrievances();
        return new ResponseEntity<>(grievances, HttpStatus.OK);
    }

    // Get grievance by ID
    @GetMapping("/{id}")
    public ResponseEntity<GrievanceEntity1> getGrievanceById(@PathVariable int id) {
        GrievanceEntity1 grievance = grievanceService.getGrievanceById(id);
        if (grievance == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(grievance);
    }

    // Create a new grievance
    @PostMapping("/add")
    public ResponseEntity<GrievanceEntity1> createGrievance(@RequestBody GrievanceEntity1 grievance) {
        // Save grievance
        GrievanceEntity1 savedGrievance = grievanceService.createGrievance(grievance);
        // Return saved grievance
        return ResponseEntity.ok(savedGrievance);
    }

    // Update an existing grievance
    @PutMapping("/{id}")
    public ResponseEntity<GrievanceEntity1> updateGrievance(@PathVariable int id, @RequestBody GrievanceEntity1 grievanceEntity) {
        GrievanceEntity1 updatedGrievance = grievanceService.updateGrievance(id, grievanceEntity);
        return new ResponseEntity<>(updatedGrievance, HttpStatus.OK);
    }

    // Delete a grievance
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrievance(@PathVariable int id) {
        grievanceService.deleteGrievance(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
