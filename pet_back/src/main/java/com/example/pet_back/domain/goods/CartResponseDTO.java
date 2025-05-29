package com.example.pet_back.domain.goods;

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

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "goods_id", insertable = false, updatable = false)
    // Goods의 다른 필드가 필요하더라도, 해당 방식으로 필요시 필드를 바로 추가해주면 됨.
    // Cart Entity 의 연관관계 매핑해 두었으므로, 바로 사용 가능.
    private String goods_name;


    // 생성자 : SELECT * FROM Cart c JOIN Goods g ON g.goods_id = c.goods_id WHERE c.member_id = :userId
    // DTO 사용: com.example.pet_back.domain.goods.CartResponseDTO
    // userID: member.getId()
    // JOIN 사용 ( c.member_id = userId )
    public CartResponseDTO( //
                            Long goods_id, String goods_name, int price, String description, String image_file, //
                            double rating, int views, int review_num, Long member_id, int quantity) {
        this.goods_id = goods_id;
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
