package com.product.project.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDateTime;
import java.util.List;
import com.product.project.Entity.GrievanceStatusEntity;
import com.product.project.Service.GrievanceStatusService;

@RestController
@RequestMapping("/grievanceStatus")
public class GrievanceStatusController {
    @Autowired
    private GrievanceStatusService grievanceStatusService;

    @PostMapping
    public ResponseEntity<GrievanceStatusEntity> createGrievanceStatus(@RequestBody GrievanceStatusEntity grievanceStatus) {
        grievanceStatus.setTimestamp(LocalDateTime.now()); // Automatically set the current timestamp
        return ResponseEntity.ok(grievanceStatusService.saveGrievanceStatus(grievanceStatus));
    }

    @GetMapping
    public ResponseEntity<List<GrievanceStatusEntity>> getAllStatuses() {
        return ResponseEntity.ok(grievanceStatusService.getAllStatuses());
    }
}
