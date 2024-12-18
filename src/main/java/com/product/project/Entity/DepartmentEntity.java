package com.product.project.Entity;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
@Entity
@Table(name="DepartmentTable")
public class DepartmentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long departmentId;
 
    private String departmentName;
    @OneToMany(mappedBy = "department")
    private Set<GrievanceEntity> grievances;
 
	public DepartmentEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
 
	public DepartmentEntity(Long departmentId, String departmentName) {
		super();
		this.departmentId = departmentId;
		this.departmentName = departmentName;
	}
 
	public Long getDepartmentId() {
		return departmentId;
	}
 
	public void setDepartmentId(Long departmentId) {
		this.departmentId = departmentId;
	}
 
	public String getDepartmentName() {
		return departmentName;
	}
 
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
 
	@Override
	public String toString() {
		return "DepartmentEntity [departmentId=" + departmentId + ", departmentName=" + departmentName + "]";
	}
    // Constructor, relations, etc.
}