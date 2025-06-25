import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AdminApi from "../../api/AdminApi";
import GoodsApi from "../../api/GoodsApi";
import Modal from "../../modal/Modal";
import React from "react";

export default function CategoryManage() {
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState(""); //카테고리 입력
  const [insertInput, setInsertInput] = useState(false); //추가 창 숫자
  const [modal, setModal] = useState(false);
  const [selCategory, setSelCategory] = useState(0); //카테고리 선택 창 여부
  const [updateForm, setUpdateForm] = useState(false); //업데이트 폼
  const [updateIndex, setUpdateIndex] = useState(0); //업데이트 폼 칸 번호
  const [updateInput, setUpdateInput] = useState("");

  useEffect(() => {
    getCategoryList();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getCategoryList = async () => {
    const result = await GoodsApi.getCategoryList();
    setCategoryList(result);
    console.log(result);
  };

  //추가 버튼 클릭
  const clickInsertBtn = () => {
    //갯수가 전부 차있는지 확인
    if (categoryList.length >= 10) alert("카테고리는 최대 10개만 가능합니다.");
    else if (insertInput) alert("생성된 추가창을 완료해주세요.");
    else setInsertInput(true);
  };

  //카테고리 추가
  const insertCategory = async () => {
    if (category.length < 2 || category.length > 6) {
      alert("카테고리는 2~6자로 입력해주세요");
    } else {
      const result = await AdminApi.categoryInsert(category);

      alert(result.message);

      //추가 성공일 경우 카테고리 목록 다시 불러오기
      if (result.success) {
        getCategoryList();
        setInsertInput(false); // input창 닫기
        setCategory(""); //카테고리 입력값 초기화
      }
    }
  };

  //카테고리 삭제 클릭
  const clickDelete = (id) => {
    setSelCategory(id); //삭제 선택 카테고리 저장
    setModal(true);
  };
  //카테고리 삭제
  const categoryDelete = async () => {
    const result = await AdminApi.categoryDelete(selCategory);
    alert(result.message);
    setModal(false);
    if (result.success) getCategoryList();
  };

  //카테고리 수정 클릭
  const clickUpdateForm = (categoryName, index) => {
    setUpdateInput(categoryName);
    setUpdateForm(true);
    //수정 선택한 칸의 index를 받아와서 선택한 칸만 업데이트 폼으로 변하게끔 조건 랜더링
    setUpdateIndex(index);
  };

  //카테고리 수정
  const categoryUpdate = async (id) => {
    const result = await AdminApi.categoryUpdate(id, updateInput);
    alert(result.message);
    setUpdateForm(false);

    if (result.success) getCategoryList();
  };
  return (
    <CategoryComp>
      {modal && (
        <div className="modal">
          <Modal
            clickEvt={categoryDelete}
            setModal={setModal}
            content="카테고리를 정말 삭제하시겠습니까?"
          />
        </div>
      )}
      <h2>카테고리 관리</h2>
      <div className="category_container">
        <div className="category_text">
          <p>카테고리 전체 목록</p>
          <p>{categoryList.length} / 10</p>
        </div>
        <ul>
          {categoryList.map((c, index) => (
            <li>
              {updateForm && index == updateIndex ? (
                <React.Fragment>
                  <input
                    type="text"
                    value={updateInput}
                    onChange={(e) => setUpdateInput(e.target.value)}
                  />
                  <div className="btn">
                    <button onClick={() => setUpdateForm(false)}>
                      수정취소
                    </button>
                    <button onClick={() => categoryUpdate(c.categoryId)}>
                      저장하기
                    </button>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <span>
                    {c.categoryName} ({c.goodsCount})
                  </span>
                  <div className="btn">
                    <button onClick={() => clickDelete(c.categoryId)}>
                      삭제
                    </button>
                    <button
                      onClick={() => clickUpdateForm(c.categoryName, index)}
                    >
                      수정
                    </button>
                  </div>
                </React.Fragment>
              )}
            </li>
          ))}
          {insertInput && (
            <li>
              <input
                type="text"
                placeholder="추가할 카테고리 이름을 입력해주세요(2 ~ 6자 이내로)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <div className="btn">
                <button onClick={() => setInsertInput(false)}>취소</button>
                <button onClick={() => insertCategory()}>추가</button>
              </div>
            </li>
          )}
        </ul>
        <button className="insert_btn" onClick={() => clickInsertBtn()}>
          + 카테고리 추가 ({categoryList.length} / 10)
        </button>
      </div>
    </CategoryComp>
  );
}
const CategoryComp = styled.div`
  .modal {
    position: fixed;
    left: 600px;
    text-align: center;
    top: 245px;
  }
  h2 {
    margin-bottom: 30px;
  }
  .category_container {
    width: 700px;
    border: 2px solid #fff;
    box-shadow: 2px 2px 2px #777;
    padding: 20px;
    background-color: #ede1dd;
    .category_text {
      display: flex;
      justify-content: space-between;
    }
    p {
      padding-bottom: 20px;
      font-size: 18px;
      font-weight: bold;
    }
    ul {
      background-color: #fff;
      border: 1px solid #ccc;
      li {
        display: flex;
        align-items: center;
        height: 70px;
        line-height: 70px;
        border-bottom: 1px solid #ccc;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        input {
          width: 400px;
          height: 40px;
          border: none;
          border-bottom: 1px solid #ccc;
          outline: none;
          font-size: 16px;
        }
        .btn {
          display: flex;
          gap: 10px;
          button {
            background-color: #7e84c8;
            height: 40px;
            width: 80px;
            cursor: pointer;
            font-weight: bold;
            color: #fff;
            text-shadow: 1px 1px 1px #000;
            border-radius: 10px;
            border: none;
          }
        }
      }
      li:hover {
        border: 2px solid #000;
      }
    }
    .insert_btn {
      margin-top: 10px;
      height: 50px;
      line-height: 50px;
      background-color: #fff;
      box-shadow: 2px 2px 2px #666;
      cursor: pointer;
      padding: 0 20px;
      width: 100%;
      font-size: 16px;
    }
    .insert_btn:hover {
      background-color: #eee;
    }
  }
`;
