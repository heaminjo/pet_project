package com.example.pet_back.domain.goods;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponseDTO {
    private Long categoryId;
    private String categoryName;
    private String description;
}
