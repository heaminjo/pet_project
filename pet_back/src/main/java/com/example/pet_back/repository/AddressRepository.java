package com.example.pet_back.repository;

import com.example.pet_back.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {

    @Query("SELECT a FROM Address a WHERE a.member.id = :id AND a.addrType = 'DEFAULT'")
    Address findDefaultByMemberId(Long id);

    Address findByMemberId(Long id);

    //기본 배송지 최 상단
    @Query(nativeQuery = true, value = "SELECT *\n" +
            "FROM address\n" +
            "WHERE member_id = :id\n" +
            "ORDER BY \n" +
            "    CASE addr_type\n" +
            "        WHEN 'DEFAULT' THEN 0\n" +
            "        ELSE 1\n" +
            "    END,\n" +
            "    address_id DESC;")
    List<Address> findAllByMemberId(Long id);
}
