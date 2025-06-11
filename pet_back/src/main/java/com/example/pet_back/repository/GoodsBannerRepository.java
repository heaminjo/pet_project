package com.example.pet_back.repository;

import com.example.pet_back.entity.Goodsbanner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GoodsBannerRepository extends JpaRepository<Goodsbanner, Long> {
    @Query(nativeQuery = true,value = "select b.banner_id ,g.goods_id,g.goods_name,g.image_file,b.position \n" +
            "from goods_banner b,goods g \n" +
            "where b.goods_id = g.goods_id" +
            " order by b.position")
    public List<Goodsbanner> bannerListAll();
}
