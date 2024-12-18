package com.product.project.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Configuration
public class CloudinaryConfig {
	@Bean
	public Cloudinary cloudinary() {
		return new Cloudinary(ObjectUtils.asMap(
	            "cloud_name", "dkjusc5fm",
	            "api_key", "698462296459178",
	            "api_secret", "YDKttfP6mSvKINkAdALucElJ_ME"
	        ));
	}
}
