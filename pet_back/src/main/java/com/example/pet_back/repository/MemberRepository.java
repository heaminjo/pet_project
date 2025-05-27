package com.example.pet_back.repository;

import com.example.pet_back.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Long> {
    public Optional<Member> findByEmail(String email);

    @Modifying
    @Query(nativeQuery = true,value = "update member set password = :password where member_id = :id")
    public void updatePassword(@Param("id") Long id ,@Param("password") String password);
}
