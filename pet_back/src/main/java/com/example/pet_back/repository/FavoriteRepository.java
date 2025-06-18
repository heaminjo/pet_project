package com.example.pet_back.repository;

import com.example.pet_back.entity.Favorite;
import com.example.pet_back.entity.FavoriteId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, FavoriteId> {

    // 찜 여부 확인
    boolean existsByMemberIdAndGoodsId(Long memberId, Long goodsId);

    // 찜 삭제 실행
    void deleteByMemberIdAndGoodsId(Long memberId, Long goodsId);

}
