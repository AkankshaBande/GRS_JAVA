package com.product.project.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.product.project.Entity.DepartmentEntity;

public interface DepartmentRepository extends JpaRepository<DepartmentEntity, Integer>{

	DepartmentEntity findByDepartmentName(String departmentName);

}
