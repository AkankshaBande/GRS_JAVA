package com.product.project.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // This annotation ensures the ID is auto-generated
    private Long id;
    private String employeeName;

    @OneToMany(mappedBy = "employee")
    @JsonManagedReference  // Tells Jackson to serialize this field
    private List<GrievanceEntity> grievances; // List of grievances assigned to this employee

    @OneToOne
    @JoinColumn(name = "user_id")  // Assuming 'user' references a User entity
    private User user;  // This is the 'user' property that the User entity refers to with 'mappedBy'

    // Default constructor
    public Employee() {}

    // Parameterized constructor
    public Employee(Long id, String employeeName) {
        this.id = id;
        this.employeeName = employeeName;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public List<GrievanceEntity> getGrievances() {
        return grievances;
    }

    public void setGrievances(List<GrievanceEntity> grievances) {
        this.grievances = grievances;
    }
}
