package com.example.pet_back.domain.address;

import com.example.pet_back.constant.ADDRTYPE;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressRequestDTO {
    private Long addressId;
    private String addressName;
    private ADDRTYPE addrType;
    private String address1;
    private String address2;
    private String addressZip;
}
