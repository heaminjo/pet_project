import styled from "styled-components";
import searchIcon from "../../images/free-icon-search-149852.png";
import { useEffect, useState } from "react";
import PageNumber from "./PageNumber";
import GoodsApi from "../../api/GoodsApi";

export default function GoodsSelectList({ selectEvt }) {
  const [categoryList, setCategoryList] = useState([]); //카테고리 리스트
  const [goodsList, setGoodsList] = useState([]);

  //페이지
  const [category, setCategory] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [paging, setPaging] = useState([]);

  useEffect(() => {
    getGoodsList(); //상품 리스트 호출
    getCategoryList();
  }, [page, category]);

  //검색버튼 엔터
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      //검색
      getGoodsList();
    }
  };

  //카테고리 가져오기(수정 , 선택 클릭 시)
  const getCategoryList = async () => {
    const result = await GoodsApi.getCategoryList();
    setCategoryList(result);
  };

  //상품 목록 가져오기(4개씩)
  const getGoodsList = async () => {
    const pages = {
      page: page,
      size: 4,
      keyword: keyword,
      category: category,
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
  return (
    <Comp>
      <div className="goods_select">
        <h3>상품 선택</h3>
        <ul className="category_list">
          <li
            onClick={() => {
              setCategory(0);
              setPage(0);
            }}
          >
            전체
          </li>
          {categoryList.map((c, index) => (
            <li
              onClick={() => {
                setCategory(index + 1);
                setPage(0);
              }}
            >
              {c.categoryName}
            </li>
          ))}
        </ul>
        <div className="search">
          <input
            type="text"
            name="search"
            onKeyDown={handleKeyDown}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button onClick={() => getGoodsList()}>
            <img src={searchIcon} alt="검색 아이콘" />
          </button>
        </div>
        <div className="goods_list">
          {goodsList.map((g) => (
            <div className="goods_item">
              <img src={g.imageFile} alt="상품 이미지" />
              <ul>
                <li>
                  <strong>[{g.categoryName}]</strong>
                </li>
                <li>{g.goodsName}</li>
                <li>{g.price}원</li>
                <li>
                  <button onClick={() => selectEvt(g.goodsId)}>선택</button>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <PageNumber page={page} setPage={setPage} paging={paging} />
      </div>
    </Comp>
  );
}
const Comp = styled.div`
  .goods_select {
    width: 900px;
    height: 650px;
    box-shadow: 3px 3px 3px #ccc;
    border: 1px solid #888;
    padding: 20px;
    /* display: flex; */
    /* gap: 10px; */

    h3 {
      text-align: center;
      margin-bottom: 10px;
    }
    .category_list {
      display: flex;
      justify-content: center;
      gap: 10px;
      li {
        width: 100px;
        height: 40px;
        background-color: rgb(54, 54, 54);
        color: #fff;
        text-align: center;
        border-radius: 20px;
        line-height: 40px;
        cursor: pointer;
      }
    }
    .search {
      width: 100%;
      display: flex;
      height: 70px;
      justify-content: center;
      align-items: center;
      input {
        height: 40px;
        width: 300px;
        border: none;
        border-bottom: 2px solid #000;
        outline: none;
        padding-left: 10px;
      }
      button {
        height: 42px;
        width: 41px;
        border: none;
        padding: 10px;
        right: 0;
        border-bottom: 2px solid #000;
        background-color: #fff;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .goods_list {
      width: 100%;
      height: 400px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 10px;
      .goods_item {
        border: 1px solid #ccc;
        box-shadow: 1px 1px 1px #888;
        padding: 20px;
        display: flex;
        img {
          width: 180px;
          height: 160px;
        }
        ul {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 5px 20px;
          li {
            button {
              margin-top: 10px;
              width: 100px;
              height: 40px;
              border: 1px solid #555;
              box-shadow: 2px 2px 2px #777;
              cursor: pointer;
              font-weight: bold;
            }
            button:hover {
              background-color: #ddd;
            }
          }
        }
      }
    }
  }
`;
