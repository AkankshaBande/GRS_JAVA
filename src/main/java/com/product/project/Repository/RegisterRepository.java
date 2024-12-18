package com.product.project.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.product.project.Entity.RegisterEntity;

public interface RegisterRepository extends JpaRepository<RegisterEntity, Long>{

	
	
	Optional<RegisterEntity> findByEmail(String email); 
	boolean existsByEmail(String email);
    Optional<RegisterEntity> findByEmailAndOccupation(String email, String occupation);
	Optional<RegisterEntity> findByEmailAndPassword(String email, String password);

}
