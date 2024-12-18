package com.product.project.Entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="GrievanceReport")
public class GrievanceEntity1 {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int grievanceId;

    private LocalDate date;
   
    private String complainantName;
    
    private String department;
    private String grievanceType;
    private String employeeName;
    private String status;
	public int getGrievanceId() {
		return grievanceId;
	}
	public void setGrievanceId(int grievanceId) {
		this.grievanceId = grievanceId;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public String getComplainantName() {
		return complainantName;
	}
	public void setComplainantName(String complainantName) {
		this.complainantName = complainantName;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getGrievanceType() {
		return grievanceType;
	}
	public void setGrievanceType(String grievanceType) {
		this.grievanceType = grievanceType;
	}
	public String getEmployeeName() {
		return employeeName;
	}
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
    

}
