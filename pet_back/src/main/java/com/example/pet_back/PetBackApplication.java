package com.example.pet_back;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class PetBackApplication {

	public static void main(String[] args) {
		//k
		SpringApplication.run(PetBackApplication.class, args);

	}

}
