package com.example.pet_back.repository;

import com.example.pet_back.domain.goods.CategoryResponseDTO;
import com.example.pet_back.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,Long> {

      @Query("SELECT new com.example.pet_back.domain.goods.CategoryResponseDTO(c.categoryId,c.categoryName,COUNT(g)) "+
              ("from Category c LEFT JOIN Goods g ON g.category = c "+
                      ("GROUP BY c.categoryId,c.categoryName")))
      List<CategoryResponseDTO> categoryList();

      boolean existsByCategoryName(String name);
}
