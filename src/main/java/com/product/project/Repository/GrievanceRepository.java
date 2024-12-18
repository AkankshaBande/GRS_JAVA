package com.product.project.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.product.project.Entity.GrievanceEntity;

public interface GrievanceRepository extends JpaRepository<GrievanceEntity, Long> {
	
//	List<GrievanceEntity> findByComplainantName(String complainantName);
	public List<GrievanceEntity> findByEmployeeEmployeeName(String employeeName);
 
	default Optional<GrievanceEntity> findGrievanceById(Long id) {
        return findById(id);
}
}