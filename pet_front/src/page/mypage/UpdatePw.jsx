import { useForm } from "react-hook-form";
import MypageMenu from "../../components/mypage/MyPageMenu";
import MyEditComp from "./MyEditStyle";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MemberApi from "../../api/MemberApi";
import { useNavigate } from "react-router-dom";

export default function UpdatePw() {
  const navigate = useNavigate();
  const schema = yup.object({
    password: yup.string().required("필수 입력 입니다."),
    newPw1: yup
      .string()
      .required("필수 입력입니다.")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`\-=|\\]).{10,16}$/,
        "10~16자 대소문자+영문+특수 기호로 조합해주세요."
      ),
    newPw2: yup
      .string()
      .oneOf([yup.ref("newPw1")], "비밀번호가 일치하지 않습니다.")
      .required("비밀번호 확인은 필수 입니다."),
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

  //비밀번호 변경
  //기존,새 비번을 보낸다.
  const updatePw = async () => {
    const passwords = {
      password: watch("password"),
      newPassword: watch("newPw1"),
    };
    const result = await MemberApi.updatePw(passwords);

    if (result.success) {
      alert("비밀번호 변경이 완료되었습니다. 다시 로그인 해주세요");
      localStorage.clear();
      navigate("/login");
    } else {
      alert("비밀번호 변경에 실패하였습니다.");
      navigate("/updatepw");
      //gngn
    }
  };

  return (
    <MyEditComp>
      <div className="myedit_inner">
        <MypageMenu />
        <div className="main_container">
          <h3>비밀번호 변경</h3>
          <hr />
          <form
            className="form_container"
            onSubmit={handleSubmit(() => updatePw())}
          >
            <table>
              <tbody>
                <tr>
                  <th>
                    <label htmlFor="email">기존 비밀번호</label>
                  </th>
                  <td>
                    <input
                      type="password"
                      {...register("password")}
                      id="password"
                      name="password"
                    />
                  </td>
                  {errors.password && (
                    <p className="error_message">{errors.password.message}</p>
                  )}
                </tr>
                <tr>
                  <th>
                    <label htmlFor="text">새 비밀번호</label>
                  </th>
                  <td>
                    <input
                      type="password"
                      {...register("newPw1")}
                      id="newPw1"
                      name="newPw1"
                    />
                  </td>
                  {errors.newPw1 && (
                    <p className="error_message">{errors.newPw1.message}</p>
                  )}
                </tr>
                <tr>
                  <th>
                    <label htmlFor="text">새 비밀번호 확인</label>
                  </th>
                  <td>
                    <input
                      type="password"
                      {...register("newPw2")}
                      id="newPw2"
                      name="newPw2"
                    />
                  </td>
                  {errors.newPw2 && (
                    <p className="error_message">{errors.newPw2.message}</p>
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
