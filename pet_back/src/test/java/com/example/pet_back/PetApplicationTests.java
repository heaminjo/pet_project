package com.example.pet_back;

import com.example.pet_back.service.AdminServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class PetApplicationTests {
    @Autowired
    AdminServiceImpl service;

    @Test
    void contextLoads() {


        System.out.println(service.gradeStatistics());
    }

}
