package com.product.project.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.product.project.Entity.DepartmentEntity;
import com.product.project.Entity.EmployeeEntity;
import com.product.project.Entity.GrievanceEntity;

@Repository
public interface GrievanceRepo extends JpaRepository<GrievanceEntity, Integer>{
	
	@Query("SELECT g FROM GrievanceEntity g")
	List<GrievanceEntity> getStatusWiseGrievanceCounts();

	@Query("SELECT d FROM DepartmentEntity d JOIN d.grievances g GROUP BY d.id")
	List<DepartmentEntity> getDepartmentWiseGrievanceCounts();

//	@Query("SELECT e FROM EmployeeEntity e JOIN e.grievances g WHERE g.status = 'Pending' GROUP BY e.id ORDER BY COUNT(g) DESC")
//	List<EmployeeEntity> getTopPendingEmployees();

	@Query("SELECT COUNT(g) FROM GrievanceEntity g GROUP BY g.date") 
	List<Integer> getDailyGrievanceCount();

    @Query("SELECT g FROM GrievanceEntity g ORDER BY g.date DESC")
    List<GrievanceEntity> getGrievanceReport(int page, int size);
    
}