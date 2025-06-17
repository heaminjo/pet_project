package com.example.pet_back.repository;

import com.example.pet_back.domain.goods.CategoryResponseDTO;
import com.example.pet_back.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,Long> {


      boolean existsByCategoryName(String name);
}
