package com.product.project.Controller;

import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.product.project.Entity.RegisterEntity;
import com.product.project.Service.RegisterService;

@RestController
@CrossOrigin     
public class RegisterController {
	
	@Autowired
    private RegisterService userService;

	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody RegisterEntity user) {
	    if (userService.emailExists(user.getEmail())) {
	        return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
	    }
	    
	    userService.registerUser(user);
	    return ResponseEntity.ok("User registered successfully");
	}
	
	 @PostMapping("/login")
	    public ResponseEntity<String> loginUser(@RequestBody RegisterEntity loginData) {
	        Optional<RegisterEntity> user = userService.loginUser(loginData.getEmail(), loginData.getPassword());
	        if (user.isPresent()) {
	            return ResponseEntity.ok("Login successful");
	        } else {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
	        }
	    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody RegisterEntity userData) {
        Optional<RegisterEntity> user = userService.findUserByEmailAndOccupation(userData.getEmail(), userData.getOccupation());
        if (user.isPresent()) {
            return ResponseEntity.ok("Password reset instructions sent");
        } else {
            return ResponseEntity.status(404).body("Email and occupation not found");
        }
    }

    // New method to reset password
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody RegisterEntity userData) {
        Optional<RegisterEntity> user = userService.findUserByEmail(userData.getEmail());
        if (user.isPresent()) {
            userService.resetPassword(userData.getEmail(), userData.getPassword());
            return ResponseEntity.ok("Password reset successfully");
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }


}
