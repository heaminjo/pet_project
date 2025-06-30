import { IoSearchSharp } from "react-icons/io5";
import styled from "styled-components";

//카테고리 리스트/ 상품변경 함수
//category,keyword,setState 만 있으면 사용 가능
export default function GoodsSearch({
  categoryList,
  getGoodsList,
  setCategory,
  setKeyword,
  setState,
}) {
  //검색버튼 엔터
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      //검색
      getGoodsList();
    }
  };

  return (
    <SearchComp>
      <div className="search_container">
        <div className="keyword_">
          <input
            type="text"
            onKeyDown={handleKeyDown}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button onClick={() => getGoodsList()}>
            <IoSearchSharp />
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
    </SearchComp>
  );
}
const SearchComp = styled.div`
  width: 100%;
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
        svg {
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
`;
