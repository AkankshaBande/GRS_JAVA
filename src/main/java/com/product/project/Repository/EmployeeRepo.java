package com.product.project.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.product.project.Entity.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {
    // You can add custom queries if needed, but this will work for basic CRUD operations
	   Optional<Employee> findById(Long id); // Method to find an employee by its ID
	   Optional<Employee> findByEmployeeName(String employeeName);
}