package com.product.project.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.product.project.Entity.UserEntity;
import com.product.project.Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserEntity login(String username, String password, String role) {
        return userRepository.findByUsernameAndPasswordAndRole(username, password, role);
    }
}
