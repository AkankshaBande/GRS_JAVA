package com.product.project.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.product.project.Entity.EmployeeEntity;

public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Integer> {

}
