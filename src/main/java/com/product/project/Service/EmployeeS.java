package com.product.project.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.product.project.Entity.Employee;
import com.product.project.Repository.EmployeeRepo;

@Service
public class EmployeeS {

    @Autowired
    private EmployeeRepo employeeRepository;

    // Method to find an employee by ID
    public Employee findEmployeeById(Long employeeId) {
        return employeeRepository.findById(employeeId).orElse(null);  // Returns null if not found
    }

    // Method to find an employee by employeeName
    public ResponseEntity<String> findEmployeeByName(String employeeName) {
        Employee employee = employeeRepository.findByEmployeeName(employeeName).orElse(null);

        if (employee == null) {
            System.out.println("Employee not found with name: " + employeeName);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Employee not found");
        }

        return ResponseEntity.ok("Employee found: " + employee.getEmployeeName());
    }
    
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
}
