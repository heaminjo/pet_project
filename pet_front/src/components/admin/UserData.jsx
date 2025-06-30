import { useEffect, useState } from "react";
import styled from "styled-components";
import Toggle from "../util/Toggle";
import AdminApi from "../../api/AdminApi";

export default function UserData({ user, setUser, navigate }) {
  //토글 클릭하면 회원의 상태를 변환한다.
  //ACTIVE = 정상회원 , BANNED = 정지회원
  const toggleClick = async () => {
    setUser({
      ...user,
      memberState: user.memberState == "정상회원" ? "정지회원" : "정상회원",
    });

    //저장
    const state = user.memberState == "정상회원" ? "BANNED" : "ACTIVE";
    const result = await AdminApi.changeState(user.id, state);
  };
  return (
    <UserDataComp>
      <div className="title">
        <p className="back" onClick={() => navigate(-1)}>
          ◀ 회원 목록으로 돌아가기
        </p>
        <h2>회원 상세 조회</h2>
      </div>
      <div className="detail">
        <div className="user_profile">
          <div className="image">
            <img src={user.imageFile} alt="" />
          </div>
          <div className="simple_data">
            <p>{user.name}</p>
          </div>
        </div>
        <div className="user_detail">
          <div className="basic_data">
            <div className="title">
              <span>기본 정보</span>
            </div>
            <table>
              <tr>
                <th>이름</th>
                <td>{user.name}</td>
              </tr>
              <tr>
                <th>이메일</th>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th>휴대번호</th>
                <td>{user.phone}</td>
              </tr>
              <tr>
                <th>생년월일 </th>
                <td>{user.birth}</td>
              </tr>
              <tr>
                <th>마지막 로그인</th>
                <td>{user?.lastLogin || "로그인 기록 없음"}</td>
              </tr>
              <tr>
                <th>가입날짜</th>
                <td>{user.regDate}</td>
              </tr>
            </table>
          </div>
          <div className="sub_data">
            <div className="grade">
              <div className="content" id="grade_content">
                <h4>등급</h4>
                <span>{user.grade}</span>
              </div>
            </div>
            <div className="state">
              <div className="content" id="state_content">
                <h4>회원 상태</h4>
                <span>{user.memberState}</span>
                <Toggle
                  isOn={user?.memberState == "정상회원"}
                  clickEvt={toggleClick}
                />
              </div>
            </div>
            <div className="point">
              <div className="content" id="point_content">
                <h4>멍코인</h4>
                <span>{user.point}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserDataComp>
  );
}
const UserDataComp = styled.div`
  .title {
    height: 80px;
    .back {
      font-size: 13px;
      margin-bottom: 30px;
      cursor: pointer;
    }
    h2 {
    }
  }
  .detail {
    margin-top: 20px;
    display: flex;
    gap: 20px;
    .user_profile {
      width: 300px;
      height: 400px;
      border: 1px solid #ccc;
      box-shadow: 3px 3px 5px #ccc;
      .image {
        width: 100%;
        height: 70%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 200px;
          height: 200px;
          border-radius: 100%;
        }
      }
      .simple_data {
        width: 100%;
        height: 30%;
        line-height: 100px;
        text-align: center;
        p {
          font-size: 25px;
        }
      }
    }
    .user_detail {
      width: 550px;
      display: flex;
      gap: 20px;
      flex-direction: column;

      .basic_data {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #ccc;
        height: 250px;
        box-shadow: 3px 5px 5px 1px #ccc;
        .title {
          height: 40px;
          background-color: #999;
          width: 100%;
          line-height: 40px;
          span {
            padding-left: 10px;
            font-weight: bold;
            color: #eee;
          }
        }
        table {
          width: 100%;
          padding: 10px;
          tr {
            height: 30px;
            border-bottom: 1px solid #ccc;
            th {
              width: 100px;
              text-align: start;
            }
            td {
              border-bottom: 1px solid #ccc;
            }
          }
        }
      }
      .sub_data {
        height: 130px;
        display: flex;
        border: 1px solid #ccc;
        box-shadow: 3px 3px 5px #ccc;

        .content {
          text-align: center;
          width: 183px;
          h4 {
            height: 40px;
            line-height: 40px;
            background-color: #999;
            color: #eee;
          }
          span {
            line-height: 50px;
            font-weight: bold;
          }
        }
      }
    }
  }
`;
