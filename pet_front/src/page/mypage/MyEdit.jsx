import { useForm } from "react-hook-form";
import MypageMenu from "../../components/MyPageMenu";
import MyEditComp from "./MyEditStyle";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import MemberApi from "../../api/MemberApi";
//회원 수정 페이지
export default function MyEdit() {
  const [user, setUser] = useState([]);

  //로드 시 회원 정보 불러오기
  useEffect(() => {
    getLoginUser();
  }, []);

  const getLoginUser = async () => {
    const result = await MemberApi.detail();
    reset({
      name: result.name,
      birth: result.birth,
      phone: result.phone,
    });

    console.log(user.name);
  };

  //회원 수정 처리
  const updateUser = async () => {
    const user = {
      name: watch("name"),
      birth: watch("birth"),
      phone: watch("phone"),
    };
    const result = await MemberApi.update(user);
  };
  const schema = yup.object({
    name: yup
      .string()
      .required("필수 입력입니다")
      .matches(/^[가-힣]*$/, "한글로만 입력해주세요.")
      .max(4, "4자 이내로 입력해주세요."),
    birth: yup
      .string()
      .matches(
        /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
        "정확한 생년월일 8자리로 입력해주세요"
      ),
    phone: yup
      .string()
      .matches(/^[0-9\b]{0,13}$/, "휴대번호를 정확하게 입력해주세요.")
      .required("필수 입력 입니다."),
  });

  //react hook form
  const {
    register, //폼 필드와 리액트 훅 폼을 연결
    watch, //특정 watch("email") 입력값들을 실시간 감시
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur", // 실시간 검사
    defaultValues: {
      name: user.name,
      birth: user.birth,
      phone: user.phone,
    },
  });
  return (
    <MyEditComp>
      <div className="myedit_inner">
        <MypageMenu />
        <div className="main_container">
          <h3>회원 수정</h3>
          <hr />
          {/* 유효성 검사 후 수정 처리 */}
          <form
            className="form_container"
            onSubmit={handleSubmit(() => updateUser())}
          >
            <table>
              <tbody>
                <tr>
                  <th>
                    <label htmlFor="email">이름</label>
                  </th>
                  <td>
                    <input
                      type="name"
                      {...register("name")}
                      id="name"
                      name="name"
                    />
                  </td>
                  {errors.name && (
                    <p className="error_message">{errors.name.message}</p>
                  )}
                </tr>
                <tr>
                  <th>
                    <label htmlFor="text">생년월일</label>
                  </th>
                  <td>
                    <input
                      type="text"
                      {...register("birth")}
                      id="birth"
                      name="birth"
                      placeholder="ex) 20001010"
                    />
                  </td>
                  {errors.birth && (
                    <p className="error_message">{errors.birth.message}</p>
                  )}
                </tr>
                <tr>
                  <th>
                    <label htmlFor="text">휴대번호</label>
                  </th>
                  <td>
                    <input
                      type="tel"
                      {...register("phone")}
                      id="phone"
                      name="phone"
                      placeholder="(-) 빼고 입력"
                    />
                  </td>
                  {errors.phone && (
                    <p className="error_message">{errors.phone.message}</p>
                  )}
                </tr>
              </tbody>
            </table>
            <div className="btn_box">
              <button className="btn" id="sub_btn" type="submit">
                수정
              </button>
              <button className="btn" id="reset_btn" type="reset">
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </MyEditComp>
  );
}
