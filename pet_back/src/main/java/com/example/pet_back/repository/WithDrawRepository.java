package com.example.pet_back.repository;

import com.example.pet_back.entity.WithDrawId;
import com.example.pet_back.entity.Withdraw;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WithDrawRepository extends JpaRepository<Withdraw, WithDrawId> {


}
