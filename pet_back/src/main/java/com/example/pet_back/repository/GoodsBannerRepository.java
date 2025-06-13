package com.example.pet_back.repository;

import com.example.pet_back.entity.Goodsbanner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GoodsBannerRepository extends JpaRepository<Goodsbanner, Long> {
    @Query(nativeQuery = true,value = "select * \n" +
            "from goods_banner\n" +
            " order by position")
    public List<Goodsbanner> bannerListAll();
}
