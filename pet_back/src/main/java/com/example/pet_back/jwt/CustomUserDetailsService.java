package com.example.pet_back.jwt;

import com.example.pet_back.entity.Member;
import com.example.pet_back.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;
    
    //DB에서 조회 후 반환
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException("유저가 존재하지않음"));
        return new CustomUserDetails(member);
    }
}
