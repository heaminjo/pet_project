package com.example.pet_back.constant;

public enum GRADE {
    NEWBIE("새싹 집사"),
    BEGINNER("초보 집사"),
    INTERMEDIATE("중급 집사"),
    EXPERT("프로 집사"),
    MASTER("펫 마스터");


    private final String gradeName;

    GRADE(String gradeName) {
        this.gradeName = gradeName;
    }

    public String getGradeName() {
        return gradeName;
    }
}
