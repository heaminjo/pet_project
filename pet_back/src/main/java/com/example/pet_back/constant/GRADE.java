package com.example.pet_back.constant;

public enum GRADE {
    NEWBIE("새싹회원"),
    BLOSSOM("초급회원"),
    BREEZE("중급회원"),
    FLAME("상급회원"),
    AURORA("프리미엄 회원");


    private final String gradeName;

    GRADE(String gradeName) {
        this.gradeName = gradeName;
    }

    public String getGradeName() {
        return gradeName;
    }
}
