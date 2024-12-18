package com.product.project.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.product.project.Entity.UserEntity;
import com.product.project.Service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Allow requests from 'null' origin
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDTO loginDTO) {
        UserEntity user = userService.login(loginDTO.getUsername(), loginDTO.getPassword(), loginDTO.getRole());
        if (user != null) {
            return ResponseEntity.ok().body("Logged in successfully");
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}

class UserLoginDTO {
    private String username;
    private String password;
    private String role;

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
