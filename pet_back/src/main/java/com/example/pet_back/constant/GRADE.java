package com.example.pet_back.constant;

public enum GRADE {
    NEWBIE("새싹회원",3,1,0,null),
    BLOSSOM("초급회원",5,3,30000,null),
    BREEZE("중급회원",10,10,100000,null),
    FLAME("상급회원",20,15,300000,null),
    AURORA("프리미엄 회원",-1,-1,-1,null);


    private final String gradeName;
    private final int loginCount;
    private final int purchaseCount;
    private final int purchasePrice;
    private GRADE nextGrade;

    GRADE(String gradeName,int loginCount,int purchaseCount,int purchasePrice,GRADE nextGrade) {
        this.gradeName = gradeName;
        this.loginCount =loginCount ;
        this.purchaseCount = purchaseCount;
        this.purchasePrice= purchasePrice;
        this.nextGrade= nextGrade;
    }

    public String getGradeName() {
        return gradeName;
    }
    public int getLogin() {
        return loginCount;
    }
    public int getCount() {
        return purchaseCount;
    }
    public int getPrice() {return purchasePrice;}
    public GRADE getNextGrade() {
        return nextGrade;
    }

    // 세터로 nextGrade를 뒤늦게 지정
    static {
        NEWBIE.nextGrade = BLOSSOM;
        BLOSSOM.nextGrade = BREEZE;
        BREEZE.nextGrade = FLAME;
        FLAME.nextGrade = AURORA;
        AURORA.nextGrade = null;
    }
}
