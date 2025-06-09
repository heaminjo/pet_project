package com.example.pet_back.domain.address;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
//배송지
public class AddressResponseDTO {
    private Long addressId;
    private String addressName;
    private String addrType;
    private String address1;
    private String address2;
    private String addressZip;
}
