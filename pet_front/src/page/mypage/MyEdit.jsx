import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useRef, useState } from "react";
import MemberApi from "../../api/MemberApi";
import { useNavigate, useOutletContext } from "react-router-dom";
import MyEditComp from "./MyEditStyle";
import { PetContext } from "./MyPage";
//회원 수정 페이지
export default function MyEdit() {
  const navigate = useNavigate();

  const [selectImage, setSelectImage] = useState(null); //선택 프로필(서버용)
  const [prevImage, setPrevImage] = useState(null); //이전 프로필필

  const { user } = useContext(PetContext);

  //로드 시 회원 정보 불러오기
  useEffect(() => {
    reset({
      name: user.name,
      birth: user.birth,
      phone: user.phone,
    });
    setPrevImage(user.imageFile);
  }, []);

  //회원 수정 처리
  const updateUser = async () => {
    const user = {
      name: watch("name"),
      birth: watch("birth"),
      phone: watch("phone"),
    };
    const result = await MemberApi.update(user);
    if (result.success) {
      alert("회원 수정이 완료되었습니다.");
      localStorage.setItem("loginName", result.data);
      navigate("/user/mypage/myinfo", { replace: true });
    }
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
  });

  //이미지 선택 버튼 클릭
  const fileInputRef = useRef(null);

  //이미지 선택
  const changeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      //파일 미리보기를 위한 객체
      const reader = new FileReader();

      reader.onloadend = () => {
        //파일 읽기가 끝났을때 자동 실행되어 선택된 이미지 저장
        setPrevImage(reader.result);
      };

      reader.readAsDataURL(file);
      setSelectImage(file);
    }
  };

  //이미지 업로드
  const uploadImage = async () => {
    if (selectImage == null) alert("사진을 변경하지 않았습니다.");
    else {
      try {
        const result = await MemberApi.uploadImage(selectImage);
        if (result.success) {
          alert(result.message);
          // setUser({...user})
          navigate("/user/mypage/myinfo", { replace: true });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <MyEditComp>
      <div className="myedit_inner">
        <div className="edit_container">
          <h3>회원 수정</h3>
          <hr />
          {/* 유효성 검사 후 수정 처리 */}
          <div className="image_box">
            <div className="image">
              <img src={prevImage} alt="" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => changeImage(e)}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
            </div>
            <div className="image_btn">
              <button
                id="select_btn"
                onClick={() => fileInputRef.current.click()}
              >
                프로필 변경
              </button>
              <button id="save_btn" onClick={() => uploadImage()}>
                등록하기
              </button>
            </div>
          </div>
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
