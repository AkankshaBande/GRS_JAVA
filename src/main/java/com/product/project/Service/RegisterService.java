package com.product.project.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.product.project.Entity.RegisterEntity;
import com.product.project.Repository.RegisterRepository;

@Service
public class RegisterService {
	
	 @Autowired
	 private RegisterRepository registerRepository;

	 public boolean emailExists(String email) {
	        return registerRepository.existsByEmail(email);
	    }

	    public RegisterEntity registerUser(RegisterEntity user) {
	        if (emailExists(user.getEmail())) {
	            throw new IllegalArgumentException("Email already exists");
	        }
	        return registerRepository.save(user); 
	    }

	    public Optional<RegisterEntity> findUserByEmailAndOccupation(String email, String occupation) {
	        return registerRepository.findByEmailAndOccupation(email, occupation); 
	    }
	    
	    public Optional<RegisterEntity> loginUser(String email, String password) {
	        return registerRepository.findByEmailAndPassword(email, password);
	    }


	    // Method to find a user by email and reset the password
	    public Optional<RegisterEntity> findUserByEmail(String email) {
	        return registerRepository.findByEmail(email);
	    }

	    public void resetPassword(String email, String newPassword) {
	        Optional<RegisterEntity> user = findUserByEmail(email);
	        if (user.isPresent()) {
	        	RegisterEntity existingUser = user.get();
	            existingUser.setPassword(newPassword); 
	            registerRepository.save(existingUser); 
	        }
	    }

}
