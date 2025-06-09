import { useEffect, useState } from "react";
import MemberApi from "../../api/MemberApi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AddressInsert from "../../components/mypage/AddressInsert";

export default function MyAddr() {
  const navigate = useNavigate();
  const [isInsert, setIsInsert] = useState(false);
  const [addrList, setAddrList] = useState([]);
  const getAddrList = async () => {
    const result = await MemberApi.addrList();
    setAddrList(result);
    console.log(addrList);
  };

  useEffect(() => {
    getAddrList();
  }, []);
  return (
    <AddrComp>
      <div className="addr_inner">
        {isInsert && (
          <div className="insert_modal">
            <div className="modal_head">
              <h4>배송지 추가</h4>
              <button>❌</button>
            </div>
            <AddressInsert />
          </div>
        )}
        <div className="addr_head">
          <h2>배송지 관리</h2>
          <button onClick={() => setIsInsert(true)}>배송지 추가</button>
        </div>
        {addrList.length > 0 && (
          <ul className="addr">
            {addrList.map((a, index) => (
              <li>
                <div className="addr_item">
                  <div className="addr1">
                    {index == 0 ? (
                      <p style={{ fontWeight: "bold" }}>{a.addrType}</p>
                    ) : (
                      <p>{a.addrType}</p>
                    )}
                    <span>{a.addressName}</span>
                  </div>

                  <div className="addr2">
                    <p>[우편번호]{a.addressZip}</p>
                    <span>
                      {a.address1} {a.address2}
                    </span>
                  </div>
                </div>
                <div className="addr_btn">
                  <button>수정</button>
                  <button>삭제</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AddrComp>
  );
}
const AddrComp = styled.div`
  .addr_inner {
    width: 850px;
    position: relative;
    .insert_modal {
      position: absolute;
      width: 400px;
      height: 500px;
      background-color: #fff;
      border: 1px solid #000;
      z-index: 100;
      left: 180px;
      top: 30px;
      .modal_head {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        button {
          width: 30px;
          border: 1px solid #ccc;
        }
      }
    }
    .addr_head {
      display: flex;
      justify-content: space-between;
      h2 {
        margin-bottom: 20px;
      }
      button {
        width: 150px;
        font-size: 15px;
        height: 40px;
        background-color: #eee;
        border: none;
        box-shadow: 2px 2px 2px #ccc;
        cursor: pointer;
      }
    }
    .addr {
      display: flex;
      flex-direction: column;
      gap: 10px;
      li {
        border: 1px solid #ccc;
        height: 150px;
        display: flex;
        justify-content: space-between;
        box-shadow: 3px 3px 3px #ccc;
        .addr_item {
          display: flex;
          .addr1 {
            display: flex;
            width: 150px;
            flex-direction: column;
            align-items: center;
            padding: 20px 0;
            border-right: 2px dashed #ccc;
            span {
              margin-top: 30px;
              font-size: 20px;
            }
          }
          .addr2 {
            width: 450px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 20px;
            font-size: 16px;
          }
        }
        .addr_btn {
          display: flex;
          flex-direction: column;
          width: 100px;
          button {
            height: 100%;
            cursor: pointer;
            border: none;
            font-weight: bold;
          }
          button:nth-child(2) {
            background-color: lightslategrey;
          }
        }
      }
    }
  }
`;
