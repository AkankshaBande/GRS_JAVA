package com.product.project.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;



@Entity
@Table(name="GrievanceType")
public class GrievanceTypeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int grievanceTypeId;

	private String type;

    // Constructor, relations, etc.
	
	public int getGrievanceTypeId() {
		return grievanceTypeId;
	}

	public void setGrievanceTypeId(int grievanceTypeId) {
		this.grievanceTypeId = grievanceTypeId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}
