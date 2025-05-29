package com.example.pet_back.repository;

import com.example.pet_back.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    public Optional<Member> findByEmail(String email);

    @Modifying
    @Query(nativeQuery = true, value = "update member set password = :password where member_id = :id")
    public void updatePassword(@Param("id") Long id, @Param("password") String password);

    //검색 조건 있는 경우
    @Query("SELECT m FROM Member m WHERE " +
            "(:type = 'name' AND m.name LIKE :keyword) OR " +
            "(:type = 'email' AND m.email LIKE :keyword)")
    Page<Member> findSearchList(@Param("type") String type, @Param("keyword") String keyword, Pageable pageable);

}
