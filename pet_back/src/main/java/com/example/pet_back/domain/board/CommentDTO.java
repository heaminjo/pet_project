package com.example.pet_back.domain.board;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CommentDTO {

    private int comment_id;
    private int board_id;
    private int member_id;
    private String content;
    private String reg_date;
    private String name;

}
