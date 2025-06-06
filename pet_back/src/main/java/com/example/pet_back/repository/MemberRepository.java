package com.example.pet_back.repository;

import com.example.pet_back.constant.ROLE;
import com.example.pet_back.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    public Optional<Member> findByEmail(String email);


    @Modifying
    @Query(nativeQuery = true, value = "update member set password = :password where member_id = :id")
    public void updatePassword(@Param("id") Long id, @Param("password") String password);

    //검색 조건 있는 경우
    @Query("SELECT m FROM Member m WHERE  m.role = :role AND " +
            "((:type = 'name' AND m.name LIKE :keyword) OR " +
            "(:type = 'email' AND m.email LIKE :keyword))")
    Page<Member> findSearchList(@Param("type") String type, @Param("keyword") String keyword, @Param("role") ROLE role, Pageable pageable);

    //모든 유저
    @Query("select m from Member m where m.role = 'USER'")
    public Page<Member> findAllUser(Pageable pageable);

    //오늘 로그인한 유저 수
    @Query(nativeQuery = true, value = "select count(*) from member where Date(last_login) = curdate()")
    public Long todayUserCount();


    //남자 수
    @Query(nativeQuery = true, value = "select count(*) from member where gender = 'MALE'")
    public Long MaleCount();

    @Query(nativeQuery = true, value = "WITH RECURSIVE date_seq AS (\n" +
            "  SELECT CURDATE() - INTERVAL 7 DAY AS dt\n" +
            "  UNION ALL\n" +
            "  SELECT dt + INTERVAL 1 DAY\n" +
            "  FROM date_seq\n" +
            "  WHERE dt + INTERVAL 1 DAY <= CURDATE()\n" +
            ")\n" +
            "SELECT\n" +
            "  DATE_FORMAT(ds.dt,'%m월 %d일') AS reg_date,\n" +
            "  COALESCE(COUNT(m.reg_date), 0) AS count\n" +
            "FROM date_seq ds\n" +
            "LEFT JOIN member m ON DATE(m.reg_date) = ds.dt\n" +
            "GROUP BY ds.dt\n" +
            "ORDER BY ds.dt;")
    public List<Object[]> userWeekJoin();


    //등급 회원 통계
    @Query(nativeQuery = true, value = "SELECT g.grade, COUNT(m.grade) AS member_count\n" +
            "FROM (\n" +
            "  SELECT 'NEWBIE' AS grade\n" +
            "  UNION ALL SELECT 'BLOSSOM'\n" +
            "  UNION ALL SELECT 'BREEZE'\n" +
            "  UNION ALL SELECT 'FLAME'\n" +
            "  UNION ALL SELECT 'AURORA'\n" +
            ") g\n" +
            "LEFT JOIN member m ON g.grade = m.grade\n" +
            "GROUP BY g.grade;")
    public List<Object[]> gradeStatistics();

    //카카오 아이디 검사
    public Optional<Member> findByKakaoId(Long kakaoId);
}
