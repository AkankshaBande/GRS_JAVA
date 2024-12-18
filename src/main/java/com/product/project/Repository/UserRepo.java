package com.product.project.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.product.project.Entity.User;
import java.util.Optional;
public interface UserRepo extends JpaRepository<User, Long> {
	    Optional<User> findByUsernameAndPasswordAndRole(String username, String password, String role);
	}


