package com.product.project.Entity;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "GrievanceStatus")
public class GrievanceStatusEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int statusId;

    @Column(name = "grievance_id")
    private int grievanceId;

    @Column(name = "employee_id")
    private int employeeId;

    private String status;
    private String reason;

    private LocalDateTime timestamp; // This field will be set automatically

    @ManyToOne
    @JoinColumn(name = "grievance_id", insertable = false, updatable = false)
    private GrievanceEntity grievance;

    @ManyToOne
    @JoinColumn(name = "employee_id", insertable = false, updatable = false)
    private EmployeeEntity employee;

    public GrievanceStatusEntity() {
        super();
        this.timestamp = LocalDateTime.now(); // Set the current time by default
    }

    public GrievanceStatusEntity(int statusId, int grievanceId, int employeeId, String status, String reason,
                                 LocalDateTime timestamp, GrievanceEntity grievance, EmployeeEntity employee) {
        super();
        this.statusId = statusId;
        this.grievanceId = grievanceId;
        this.employeeId = employeeId;
        this.status = status;
        this.reason = reason;
        this.timestamp = LocalDateTime.now(); // Set the current time by default
        this.grievance = grievance;
        this.employee = employee;
    }



	public int getStatusId() {
		return statusId;
	}



	public void setStatusId(int statusId) {
		this.statusId = statusId;
	}



	public int getGrievanceId() {
		return grievanceId;
	}



	public void setGrievanceId(int grievanceId) {
		this.grievanceId = grievanceId;
	}



	public int getEmployeeId() {
		return employeeId;
	}



	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}



	public String getStatus() {
		return status;
	}



	public void setStatus(String status) {
		this.status = status;
	}



	public String getReason() {
		return reason;
	}



	public void setReason(String reason) {
		this.reason = reason;
	}



	public LocalDateTime getTimestamp() {
		return timestamp;
	}



	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}



	public GrievanceEntity getGrievance() {
		return grievance;
	}



	public void setGrievance(GrievanceEntity grievance) {
		this.grievance = grievance;
	}



	public EmployeeEntity getEmployee() {
		return employee;
	}



	public void setEmployee(EmployeeEntity employee) {
		this.employee = employee;
	}



	@Override
	public String toString() {
		return "GrievanceStatusEntity [statusId=" + statusId + ", grievanceId=" + grievanceId + ", employeeId="
				+ employeeId + ", status=" + status + ", reason=" + reason + ", timestamp=" + timestamp + ", grievance="
				+ grievance + ", employee=" + employee + "]";
	}
    
    
}
