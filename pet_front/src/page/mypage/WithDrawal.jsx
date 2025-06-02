import { useState } from "react";
import styled from "styled-components";
import Modal from "../../modal/Modal";
import MemberApi from "../../api/MemberApi";
import { useNavigate } from "react-router-dom";

export default function WithDrawal() {
  const WithDrawalComp = styled.div`
    .withDrawal_container {
      width: 800px;
      height: 400px;
      border: 1px solid #ccc;
      text-align: center;
      position: relative;
      padding: 20px;
      box-shadow: 3px 3px 3px #ccc;
      border-radius: 20px;
      .modal {
        position: absolute;
        left: 220px;
        bottom: 350px;
      }
      .text_box {
        display: flex;
        padding: 30px;
        flex-direction: column;
        border: 1px solid #000;
        background-color: #fff;
        border-radius: 20px;
        margin-bottom: 100px;
        gap: 50px;
        .check_box {
          display: flex;
          justify-content: center;
          gap: 5px;
          label {
            font-size: 13px;
          }
        }
      }
      .btn {
        button {
          width: 300px;
          height: 40px;
          border: none;
          font-weight: bold;
          border-radius: 10px;
          cursor: pointer;
        }
      }
    }
  `;

  const [modal, setModal] = useState(false); //탈퇴 모달
  const [isCheck, setIsCheck] = useState(false); //체크 박스 확인
  const navigate = useNavigate();
  //탈퇴 처리
  const withdrawal = async () => {
    console.log("탈퇴 처리 실행");
    const result = await MemberApi.withdrawal();
    if (result.success) {
      localStorage.clear();
      navigate("/withcomplete");
    }
  };

  //탈퇴 클릭
  const clickBtn = () => {
    if (isCheck) {
      setModal(true);
    } else {
      alert("안내사항에 동의해주세요.");
    }
  };
  return (
    <WithDrawalComp>
      <div className="withDrawal_container">
        <div className="modal">
          {modal && (
            <Modal
              clickEvt={withdrawal}
              setModal={setModal}
              content="정말 탈퇴하시겠습니까?"
            />
          )}
        </div>
        <div className="text_box">
          <h2>회원 탈퇴하기 전, 다음 내용은 꼭 확인해주십시요</h2>
          <p>
            회원 탈퇴 시 몽냥마켓에서 이용하실 수 있는 모든 서비스 사용이
            불가능해지며, 다시 복구하는 것 또한 불가능합니다.
          </p>
          <div className="check_box">
            <input
              type="checkbox"
              name="check"
              id="check"
              checked={isCheck}
              onChange={(e) => setIsCheck(e.target.checked)}
            />
            <label htmlFor="check">
              위 내용들을 모두 확인하였으며, 이에 동의합니다.
            </label>
          </div>
        </div>
        <div className="btn">
          <button onClick={() => clickBtn()}>탈퇴하기</button>
        </div>
      </div>
    </WithDrawalComp>
  );
}
