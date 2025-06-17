package com.example.pet_back.repository;

import com.example.pet_back.entity.GoodsBest;
import com.example.pet_back.entity.Goodsbanner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoodsBestRepository extends JpaRepository<GoodsBest,Long> {
    @Query(nativeQuery = true,value = "select * \n" +
            "from goods_best\n" +
            " order by position")
    public List<GoodsBest> bestListAll();
}
