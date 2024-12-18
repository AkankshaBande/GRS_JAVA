package com.product.project.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.product.project.Entity.Employee;
import com.product.project.Service.EmployeeS;

@RestController
@RequestMapping("/employees")
@CrossOrigin("*")
public class EmployeeC {
	
	@Autowired
    private EmployeeS employeeService;
	
	@GetMapping
    public List<Employee> fetchEmployees() {
        return employeeService.getAllEmployees();
    }
}
