import { useEffect, useState } from "react";
import MemberApi from "../../api/MemberApi";
import styled from "styled-components";

export default function MyAddr() {
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
        <h2>배송지 관리</h2>
        {addrList.length > 0 && (
          <ul>
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

    h2 {
      margin-bottom: 20px;
    }
    ul {
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
