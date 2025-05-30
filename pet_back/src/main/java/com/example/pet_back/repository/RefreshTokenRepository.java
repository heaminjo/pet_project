package com.example.pet_back.repository;

import com.example.pet_back.entity.RefreshToken;
import org.hibernate.Remove;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, String> {
    Optional<RefreshToken> findByToken(String token);

    @Remove
    void deleteByToken(String token);

    void deleteByUserId(Long id);
}
