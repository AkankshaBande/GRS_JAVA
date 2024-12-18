package com.product.project.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.product.project.Entity.User;
import com.product.project.Repository.UserRepo;
import java.util.Optional;
@Service
public class UserS {

	    @Autowired
	    private UserRepo userRepository;

	    // Method for user login
	    public User login(String username, String password, String role) {
	        Optional<User> userOptional = userRepository.findByUsernameAndPasswordAndRole(username, password, role);
	        return userOptional.orElse(null);
	    }

	    // Method to create a new user
	    public User saveUser(User user) {
	        return userRepository.save(user);
	    }

	    // Method to get user by ID
	    public User getUserById(Long id) {
	        return userRepository.findById(id).orElse(null);
	    }
	}


