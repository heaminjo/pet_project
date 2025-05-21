package com.example.pet_back.domain.login;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MemberDTO {
	
	private int member_id;
	private String email;
	private String password;
	private String name;
	private String phone;
	private String birth;
	private String grade;
	private String image_file;
	private String member_state;
	private String role;
	private String reg_date;
	private String mod_date;
	private int address_id;

}
