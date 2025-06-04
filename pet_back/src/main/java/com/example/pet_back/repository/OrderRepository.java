package com.example.pet_back.repository;

import com.example.pet_back.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Orders, Long> {
    

}
