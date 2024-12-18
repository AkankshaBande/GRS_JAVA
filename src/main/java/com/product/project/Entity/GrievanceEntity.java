//package com.product.project.Entity;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.Table;
//
//import java.time.LocalDate;
//
//@Entity
//@Table(name="GrievancePRM")
//public class GrievanceEntity {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int grievanceId;
//
//    private LocalDate date;
//    private String department;
//    private String designation;
//    private String employeeName;
//    private String complainantName;
//    private String aadhaarNo;
//    private String mobileNo;
//    private String taluka;
//    private String village;
//	private String type;
//    private String document;// This will store the URL of the uploaded document/image
//    private String status;
//    
//    @ManyToOne
//    @JoinColumn(name = "departmentId")
//    private DepartmentEntity departments;
//    
//    @ManyToOne
//    @JoinColumn(name = "employeeId")
//    private EmployeeEntity employee;
//
//	public GrievanceEntity() {
//		super();
//		// TODO Auto-generated constructor stub
//	}
//
//	public GrievanceEntity(int grievanceId, LocalDate date, String department, String designation, String employeeName,
//			String complainantName, String aadhaarNo, String mobileNo, String taluka, String village, String type, String document, String status) {
//		super();
//		this.grievanceId = grievanceId;
//		this.date = date;
//		this.department = department;
//		this.designation = designation;
//		this.employeeName = employeeName;
//		this.complainantName = complainantName;
//		this.aadhaarNo = aadhaarNo;
//		this.mobileNo = mobileNo;
//		this.taluka = taluka;
//		this.village = village;
//		this.type = type;
//		this.document = document;
//		this.status = status;
//	}
//
//	public int getGrievanceId() {
//		return grievanceId;
//	}
//
//	public void setGrievanceId(int grievanceId) {
//		this.grievanceId = grievanceId;
//	}
//
//	public LocalDate getDate() {
//		return date;
//	}
//
//	public void setDate(LocalDate date) {
//		this.date = date;
//	}
//
//	public String getDepartment() {
//		return department;
//	}
//
//	public void setDepartment(String department) {
//		this.department = department;
//	}
//
//	public String getDesignation() {
//		return designation;
//	}
//
//	public void setDesignation(String designation) {
//		this.designation = designation;
//	}
//
//	public String getEmployeeName() {
//		return employeeName;
//	}
//
//	public void setEmployeeName(String employeeName) {
//		this.employeeName = employeeName;
//	}
//
//	public String getComplainantName() {
//		return complainantName;
//	}
//
//	public void setComplainantName(String complainantName) {
//		this.complainantName = complainantName;
//	}
//
//	public String getAadhaarNo() {
//		return aadhaarNo;
//	}
//
//	public void setAadhaarNo(String aadhaarNo) {
//		this.aadhaarNo = aadhaarNo;
//	}
//
//	public String getMobileNo() {
//		return mobileNo;
//	}
//
//	public void setMobileNo(String mobileNo) {
//		this.mobileNo = mobileNo;
//	}
//
//	public String getTaluka() {
//		return taluka;
//	}
//
//	public void setTaluka(String taluka) {
//		this.taluka = taluka;
//	}
//
//	public String getVillage() {
//		return village;
//	}
//
//	public void setVillage(String village) {
//		this.village = village;
//	}
//
//	public String getType() {
//		return type;
//	}
//
//	public void setType(String type) {
//		this.type = type;
//	}
//
//	public String getDocument() {
//		return document;
//	}
//
//	public void setDocument(String document) {
//		this.document = document;
//	}
//	 public String getStatus() {
//	        return status;
//	    }
//
//	    public void setStatus(String status) {
//	        this.status = status;
//	    }
//
//	
//
//	@Override
//	public String toString() {
//		return "GrievanceEntity [grievanceId=" + grievanceId + ", date=" + date + ", department=" + department
//				+ ", designation=" + designation + ", employeeName=" + employeeName + ", complainantName="
//				+ complainantName + ", aadhaarNo=" + aadhaarNo + ", mobileNo=" + mobileNo + ", taluka=" + taluka
//				+ ", village=" + village + ", type=" + type + ", document=" + document + ", status=" + status + "]";
//	}
//
//    // Constructor, relations, etc.
//    
//    
//}
package com.product.project.Entity;

import jakarta.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.product.project.Entity.Employee; 
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "grievances")
public class GrievanceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private String designation;
    private String complainantName;
    private String aadhaarNo;
    private String mobileNo;
    private String taluka;
    private String village;
    private String type;
    private String document;

    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    @JsonBackReference  // Prevents infinite recursion by excluding this field from serialization
    private Employee employee; // Employee associated with the grievance

    @ManyToOne
    @JoinColumn(name = "department_id", referencedColumnName = "departmentId")
    private DepartmentEntity department; // Department associated with the grievance
    
    @Column(nullable = false)
    private String status = "Pending"; // Default status value

    // Default constructor
    public GrievanceEntity() {}

    // Parameterized constructor
    public GrievanceEntity(LocalDate date, String designation, String complainantName, String aadhaarNo, 
                           String mobileNo, String taluka, String village, String type, String document, 
                           Employee employee, DepartmentEntity department) {
        this.date = date;
        this.designation = designation;
        this.complainantName = complainantName;
        this.aadhaarNo = aadhaarNo;
        this.mobileNo = mobileNo;
        this.taluka = taluka;
        this.village = village;
        this.type = type;
        this.document = document;
        this.employee = employee;
        this.department = department; // Accept a DepartmentEntity object here
        this.status = "Pending"; // Default status
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getComplainantName() {
        return complainantName;
    }

    public void setComplainantName(String complainantName) {
        this.complainantName = complainantName;
    }

    public String getAadhaarNo() {
        return aadhaarNo;
    }

    public void setAadhaarNo(String aadhaarNo) {
        this.aadhaarNo = aadhaarNo;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public String getTaluka() {
        return taluka;
    }

    public void setTaluka(String taluka) {
        this.taluka = taluka;
    }

    public String getVillage() {
        return village;
    }

    public void setVillage(String village) {
        this.village = village;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public DepartmentEntity getDepartment() {
        return department;
    }

    public void setDepartment(DepartmentEntity department) {
        this.department = department;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
 // Method to get the employee's name
    public String getEmployeeName() {
        if (this.employee != null) {
            return this.employee.getEmployeeName(); // Assuming the Employee class has a getEmployeeName method
        }
        return null; // or return a default value like "Unknown" if employee is null
    }
}
