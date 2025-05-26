import { useForm } from "react-hook-form";
import MypageMenu from "../../components/mypage/MyPageMenu";
import MyEditComp from "./MyEditStyle";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export default function UpdatePw() {
  const schema = yup.object({
    password: yup
      .string()
      .required("필수 입력입니다.")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`\-=|\\]).{10,16}$/,
        "10~16자 대소문자+영문+특수 기호로 조합해주세요."
      ),
  });

  //react hook form
  const {
    register, //폼 필드와 리액트 훅 폼을 연결
    watch, //특정 watch("email") 입력값들을 실시간 감시
    handleSubmit,
    trigger, //실시간 검사
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur", // 실시간 검사
  });
  return (
    <MyEditComp>
      <div className="myedit_inner">
        <MypageMenu />
        <div className="main_container">
          <h3>비밀번호 변경</h3>
          <hr />
          <form className="form_container" onSubmit={handleSubmit()}>
            <table>
              <tbody>
                <tr>
                  <th>
                    <label htmlFor="email">기존 비밀번호</label>
                  </th>
                  <td>
                    <input
                      type="name"
                      {...register("name")}
                      id="name"
                      name="name"
                    />
                    {errors.name && (
                      <p className="error_message">{errors.name.message}</p>
                    )}
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="text">새 비밀번호</label>
                  </th>
                  <td>
                    <input
                      type="tel"
                      {...register("phone")}
                      id="phone"
                      name="phone"
                      placeholder="(-) 빼고 입력"
                    />
                    {errors.phone && (
                      <p className="error_message">{errors.phone.message}</p>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="pw_btn_box">
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
