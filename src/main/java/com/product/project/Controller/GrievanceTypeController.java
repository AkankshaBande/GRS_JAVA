package com.product.project.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.product.project.Entity.GrievanceTypeEntity;
import com.product.project.Service.GrievanceTypeService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/grievanceType")
public class GrievanceTypeController {
    @Autowired
    private GrievanceTypeService grievanceTypeService;

    @PostMapping
    public ResponseEntity<GrievanceTypeEntity> createGrievanceType(@RequestBody GrievanceTypeEntity grievanceType) {
        return ResponseEntity.ok(grievanceTypeService.saveGrievanceType(grievanceType));
    }

    @GetMapping
    public ResponseEntity<List<GrievanceTypeEntity>> getAllGrievanceTypes() {
        return ResponseEntity.ok(grievanceTypeService.getAllGrievanceTypes());
    }

    // @GetMapping("/{id}")
    // public ResponseEntity<GrievanceTypeEntity> getGrievanceTypeById(@PathVariable int id) {
    //     Optional<GrievanceTypeEntity> grievanceType = grievanceTypeService.getGrievanceTypeById(id);
    //     return grievanceType.map(ResponseEntity::ok)
    //                         .orElse(ResponseEntity.notFound().build());
    // }

    @PutMapping("/{id}")
    public ResponseEntity<GrievanceTypeEntity> updateGrievanceType(@PathVariable int id, @RequestBody GrievanceTypeEntity updatedGrievanceType) {
        GrievanceTypeEntity updated = grievanceTypeService.updateGrievanceType(id, updatedGrievanceType);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrievanceType(@PathVariable int id) {
        boolean deleted = grievanceTypeService.deleteGrievanceType(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
