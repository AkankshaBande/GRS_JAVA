package com.product.project.Repository;

import com.product.project.Entity.GrievanceEntity1;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GrievanceRepository1 extends JpaRepository<GrievanceEntity1, Integer> {
    // Additional query methods can be defined here if needed
}
