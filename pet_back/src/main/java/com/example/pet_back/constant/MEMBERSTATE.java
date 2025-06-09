package com.example.pet_back.constant;

public enum MEMBERSTATE {
    ACTIVE("정상회원"), WITHDRAWN("탈퇴회원"), BANNED("정지회원"), INCOMPLETE("임시회원");
    private final String gradeName;

    MEMBERSTATE(String gradeName) {
        this.gradeName = gradeName;
    }

    public String getGradeName() {
        return gradeName;
    }
}
