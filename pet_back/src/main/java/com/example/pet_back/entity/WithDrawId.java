package com.example.pet_back.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WithDrawId implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long memberId;
    private Long orderId;
}
