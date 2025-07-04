package com.example.pet_back.entity;

import com.example.pet_back.constant.ADDRTYPE;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = "address_id")
    private Long addressId;

    //지연로딩
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    Member member;

    @Column(nullable = false, length = 50)
    private String address1;

    @Column(nullable = true, length = 50)
    private String address2;

    @Column(nullable = false)
    private String addressZip;

    @Enumerated(EnumType.STRING)
    private ADDRTYPE addrType;

    private String addressName;

    public Address(Member member, String address1, String address2, String addressZip, ADDRTYPE type, String name) {
        this.member = member;
        this.address1 = address1;
        this.address2 = address2;
        this.addressZip = addressZip;
        this.addrType = type;
        this.addressName = name;
    }
}
