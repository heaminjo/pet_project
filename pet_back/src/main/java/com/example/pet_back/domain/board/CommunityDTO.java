package com.example.pet_back.domain.board;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CommunityDTO {
    private int board_id;
    private int member_id;
    private String title;
    private String content;
    private int views;
    private String reg_date;
    private String name;
}
