package com.product.project.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.product.project.Entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
	UserEntity findByUsernameAndPasswordAndRole(String username, String password, String role);
}
