package com.product.project.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.product.project.Entity.User;
import com.product.project.Service.UserS;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")

public class UserC {
	    @Autowired
	    private UserS userService;

	    // Endpoint for user login
	    @PostMapping("/login")
	    public ResponseEntity<?> login(@RequestBody User loginRequest) {
	        User user = userService.login(loginRequest.getUsername(), loginRequest.getPassword(), loginRequest.getRole());
	        if (user != null) {
	            return ResponseEntity.ok().body("Logged in successfully");
	        } else {
	            return ResponseEntity.status(401).body("Invalid credentials");
	        }
	    }

	    // Endpoint to create a new user
	    @PostMapping("/create")
	    public ResponseEntity<?> createUser(@RequestBody User newUser) {
	        User createdUser = userService.saveUser(newUser);
	        return ResponseEntity.ok(createdUser);
	    }

	    // Endpoint to get user details by ID
	    @GetMapping("/{id}")
	    public ResponseEntity<?> getUserById(@PathVariable Long id) {
	        User user = userService.getUserById(id);
	        if (user != null) {
	            return ResponseEntity.ok(user);
	        } else {
	            return ResponseEntity.status(404).body("User not found");
	        }
	    }
	}
