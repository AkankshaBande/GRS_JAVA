package com.product.project.Entity;

public class TransferRequest {

    private Long grievanceId;
    private String department;
    private String designation;
    private String newEmployeeName;
    private Long newEmployeeId;
    // Getters and Setters
    public Long getGrievanceId() {
        return grievanceId;
    }

    public void setGrievanceId(Long grievanceId) {
        this.grievanceId = grievanceId;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getEmployeeName() {
        return newEmployeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.newEmployeeName = employeeName;
    }
    public Long getNewEmployeeId() {
        return newEmployeeId;
    }

    public void setNewEmployeeId(Long newEmployeeId) {
        this.newEmployeeId = newEmployeeId;
    }
}

