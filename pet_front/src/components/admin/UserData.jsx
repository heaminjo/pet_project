import { useEffect, useState } from "react";
import styled from "styled-components";
import Toggle from "../util/Toggle";
import AdminApi from "../../api/AdminApi";

export default function UserData({ user, setUser, navigate }) {
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
              height: 35px;
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
            <img
              src="data:image/jpeg;base64,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"
              alt=""
            />
          </div>
          <div className="simple_data">
            <p>이름</p>
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
