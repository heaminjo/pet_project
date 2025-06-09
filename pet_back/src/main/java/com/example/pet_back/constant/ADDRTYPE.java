package com.example.pet_back.constant;

public enum ADDRTYPE {
    DEFAULT("기본배송지"),
    NORMAL("일반배송지");


    private final String addressName;

    ADDRTYPE(String addrName) {
        this.addressName = addrName;
    }

    public String getAddrName() {
        return addressName;
    }
    
}
