package com.example.pet_back.domain.member;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
public class GradeResponseDTO {
    private String next;
    private int loginCount;
    private int totalPurchaseCount;
    private int purchasePrice;
}
