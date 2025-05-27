package com.example.pet_back.domain.login;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartResponseDTO extends GoodsDTO {

    // Cart
    private Long member_id;
    private Long goods_id;
    private int quantity;


    // 생성자 : SELECT * FROM Cart c JOIN Goods g ON g.goods_id = c.goods_id WHERE c.member_id = :userId
    // DTO 사용: com.example.pet_back.domain.login.CartResponseDTO
    // userID: member.getId()
    // JOIN 사용 ( c.member_id = userId )
    public CartResponseDTO( //
                            String goods_name, int price, String description, String image_file, //
                            double rating, int views, int review_num, Long member_id, int quantity) {
        super.setGoods_name(goods_name);
        super.setPrice(price);
        super.setDescription(description);
        super.setImage_file(image_file);
        super.setRating(rating);
        super.setViews(views);
        super.setReview_num(review_num);
        this.member_id = member_id;
        this.quantity = quantity;
    }


}
