import { useEffect, useState } from "react";
import MemberApi from "../../api/MemberApi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AddressInsert from "../../components/mypage/AddressInsert";
import Modal from "../../modal/Modal";

export default function MyAddr() {
  window.scrollTo({ top: 0, behavior: "smooth" });

  const navigate = useNavigate();
  const [isInsert, setIsInsert] = useState(false); //추가 창
  const [isUpdate, setIsUpdate] = useState(false); //추가 창
  const [addressData, setAddressData] = useState([]); //배송지 상세세
  const [addrList, setAddrList] = useState([]); //배송지 목록
  const [modal, setModal] = useState(false); //삭제 모달달
  const [del, setDel] = useState(0);
  //배송지 목록 API
  const getAddrList = async () => {
    const result = await MemberApi.addrList();
    setAddrList(result);
  };

  useEffect(() => {
    getAddrList();
  }, [isInsert, isUpdate, modal]);

  //배송지 추가 버튼 클릭
  const clickInsert = () => {
    if (addrList.length == 5) {
      alert("배송지는 최대 5개까지 저장 가능합니다.");
    } else {
      setIsInsert(true);
    }
  };

  //삭제 버튼 클릭
  const clickDelete = (id) => {
    setDel(id);
    setModal(true);
  };

  //배송지 삭제
  const addressDelete = async () => {
    console.log("삭제" + del);
    const result = await MemberApi.addressDelete(del);
    alert(result.message);
    setModal(false);
  };

  //배송지 수정 클릭
  const clickUpdate = async (id) => {
    const result = await MemberApi.addrDetail(id);
    setAddressData(result.data);
    console.log(result.data);
    setIsUpdate(true);
  };
  return (
    <AddrComp>
      <div className="addr_inner">
        {isUpdate && (
          <div className="insert_modal">
            <div className="modal_head">
              <h4>배송지 수정</h4>
              <button onClick={() => setIsUpdate(false)}>❌</button>
            </div>
            <AddressInsert setIs={setIsUpdate} data={addressData} />
          </div>
        )}
        {isInsert && (
          <div className="insert_modal">
            <div className="modal_head">
              <h4>배송지 추가</h4>
              <button onClick={() => setIsInsert(false)}>❌</button>
            </div>
            <AddressInsert setIs={setIsInsert} />
          </div>
        )}

        {modal && (
          <div className="modal">
            <Modal
              content="정말 삭제하시겠습니까?"
              setModal={setModal}
              clickEvt={addressDelete}
            />
          </div>
        )}
        <div className="addr_head">
          <h2>
            배송지 관리 <span>({addrList.length} / 5)</span>
          </h2>

          <button onClick={() => clickInsert()}>배송지 추가</button>
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
                  <button onClick={() => clickUpdate(a.addressId)}>수정</button>
                  {/* 기본배송지는 삭제 불가능 */}
                  {a.addrType == "일반배송지" && (
                    <button onClick={() => clickDelete(a.addressId)}>
                      삭제
                    </button>
                  )}
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
    .modal {
      position: fixed;
      left: 600px;
      text-align: center;
      top: 245px;
    }
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
        span {
          font-size: 15px;
        }
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
