import { useEffect, useState } from "react";
import styled from "styled-components";
import GoodsApi from "../../api/GoodsApi";
import searchIcon from "../../images/searchmagnifierinterfacesymbol_79894.png";
import PageNumber from "../../components/util/PageNumber";
import React from "react";
import AdminApi from "../../api/AdminApi";
export default function Inventory() {
  const [categoryList, setCategoryList] = useState([]);
  const [goodsList, setGoodsList] = useState([]);
  const [quantity, setQuantity] = useState(0); // 수정될 수량
  const [btn, setBtn] = useState([]);

  //페이지
  const [category, setCategory] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [state, setState] = useState("all");
  const [paging, setPaging] = useState([]);

  useEffect(() => {
    getCategoryList();
    getGoodsList();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, category, state]);

  const getCategoryList = async () => {
    const result = await GoodsApi.getCategoryList();
    setCategoryList(result);
    console.log(result);
  };

  //검색버튼 엔터
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      //검색
      getGoodsList();
    }
  };

  //상품 목록 가져오기
  const getGoodsList = async () => {
    const pages = {
      page: page,
      size: 10,
      keyword: keyword,
      category: category,
      state: state,
    };
    const result = await GoodsApi.getGoodsList(pages);
    setGoodsList(result.content);

    let temp = Math.floor(page / 5) * 5;

    //페이지번호 정보 저장
    setPaging({
      start: temp,
      end: Math.min(temp + 5, result.totalPages),
      isPrev: result.prev,
      isNext: result.next,
      totalElement: result.totalElements,
      totalPages: result.totalPages,
    });
  };

  //수량 버튼 클릭
  const updateClick = (quantity, select, type) => {
    //활성화 할 버튼 자리 추가
    setBtn([...btn, { index: select }]);

    //버튼 클릭 시 goddsList에 해당 상품 수량이 변하게 함
    setGoodsList((prevList) => {
      //기존 배열 값 복사 하여 타입에 따라 값 변경한 배열을 return 하여 set
      const newList = [...prevList];
      if (type === "plus") {
        newList[select].quantity = quantity + 1;
      } else if (type === "minus") {
        newList[select].quantity = quantity - 1;
      }
      return newList;
    });
  };

  //수량 업데이트
  const updateQuantity = async (goodsId, quantity, index) => {
    setBtn([]);

    const result = await AdminApi.updateQuantity(goodsId, quantity);

    alert(result.message);
    getGoodsList();
  };
  return (
    <InventoryComp>
      <h2>재고관리</h2>
      <div className="inventory_container">
        <div className="search_container">
          <div className="keyword_">
            <input
              type="text"
              onKeyDown={handleKeyDown}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button onClick={() => getGoodsList()}>
              <img src={searchIcon} alt="검색 아이콘" />
            </button>
          </div>
          <div className="category_">
            <label htmlFor="category">카테고리</label>
            <select
              name="category"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={0}>전체</option>
              {categoryList.map((c) => (
                <option value={c.categoryId}>{c.categoryName}</option>
              ))}
            </select>
          </div>
          <div className="state_">
            <label htmlFor="state">상품 상태</label>
            <select
              name="state"
              id="state"
              onChange={(e) => setState(e.target.value)}
            >
              <option value="all">전체</option>
              <option value="SALE">정상판매</option>
              <option value="SOLDOUT">품절</option>
              <option value="HIDDEN">숨김</option>
            </select>
          </div>
        </div>
        <div className="list_container">
          <table>
            <tr>
              <th>번호</th>
              <th>이름</th>
              <th>상품 사진</th>
              <th>상태</th>
              <th>수량</th>
              <th>입고</th>
              <th>출고</th>
              <th>재고 수정</th>
            </tr>
            {goodsList.length > 0 ? (
              <React.Fragment>
                {goodsList.map((g, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{g.goodsName}</td>
                    <td>
                      <img src={g.imageFile} alt="상품 이미지" />
                    </td>
                    <td>{g.goodsState}</td>
                    <td>{g.quantity}</td>
                    <td>
                      <button
                        id="plus"
                        onClick={() => updateClick(g.quantity, index, "plus")}
                      >
                        +
                      </button>
                    </td>
                    <td>
                      <button
                        id="minus"
                        onClick={() => updateClick(g.quantity, index, "minus")}
                      >
                        -
                      </button>
                    </td>
                    <td>
                      {btn.some((item) => item.index === index) ? (
                        <button
                          className="update_btn"
                          onClick={() =>
                            updateQuantity(g.goodsId, g.quantity, index)
                          }
                        >
                          재고 수정
                        </button>
                      ) : (
                        <button disabled className="update_btn not">
                          재고 수정
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ) : (
              <tr>
                <td colSpan={8}>조회되는 상품이 없습니다.</td>
              </tr>
            )}
          </table>
        </div>

        <PageNumber page={page} setPage={setPage} paging={paging} />
      </div>
    </InventoryComp>
  );
}
const InventoryComp = styled.div`
  height: 1150px;
  .inventory_container {
    width: 1000px;
    padding: 20px 0;
    .search_container {
      width: 100%;
      height: 100px;

      display: flex;
      align-items: center;
      gap: 20px;
      .keyword_ {
        display: flex;
        input {
          height: 40px;
          width: 300px;
          border: 2px solid #000;
          padding-left: 10px;
          outline: none;
          border-right: none;
          border-radius: 5px 0 0 5px;
        }
        button {
          background-color: #fff;
          border: 2px solid #000;
          border-left: none;
          padding-right: 5px;
          cursor: pointer;
          border-radius: 0 5px 5px 0;
          img {
            width: 30px;
          }
        }
      }

      .category_,
      .state_ {
        display: flex;
        height: 44px;
        border-radius: 5px;
        font-weight: bold;
        border: 2px solid #000;
        padding-right: 10px;
        label {
          line-height: 44px;
          padding: 0 20px;
          border-right: 2px dashed #000;
        }
        select {
          padding-left: 10px;
          height: 44px;
          width: 100px;
          border: none;
          outline: none;
          border-radius: 0.3rem;
          font-size: 16px;
          padding-top: 3px;
          cursor: pointer;
          font-weight: bold;
          option {
            background-color: #fff;
            color: #000;
          }
        }
      }
    }
    .list_container {
      width: 1000px;
      table {
        border: 1px solid #000;
        width: 1000px;
        text-align: center;
        border-collapse: collapse;
        padding-bottom: 20px;
        tr {
          height: 50px;
          th {
            background-color: #fdffce;
          }
          td {
            border-bottom: 1px solid #ccc;
            img {
              width: 80px;
              height: 80px;
            }
            button:not(.update_btn) {
              width: 40px;
              height: 40px;
              font-size: 20px;
              border-radius: 100%;
              border: 1px solid #ccc;
              box-shadow: 1px 1px 1px #555;
              cursor: pointer;
            }
            .update_btn {
              width: 80px;
              height: 40px;
              border: none;
              border-radius: 20px;
              background-color: #28a745;
              cursor: pointer;
              font-weight: bold;
              color: #fff;
            }
            .not {
              background-color: #ccc;
            }
          }
        }
      }
    }
  }
`;
