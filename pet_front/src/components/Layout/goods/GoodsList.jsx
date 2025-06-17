import GoodsListComp from "./GoodsListStyle.js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GoodsApi from "../../../api/GoodsApi";
import PageNumber from "../../util/PageNumber.jsx";

export default function GoodsList() {
  const navigate = useNavigate();
  const location = useLocation();
  const goodsImg = process.env.PUBLIC_URL + "/images/pic1.png";
  const imgUrl = "http://localhost:8080/resources/webapp/userImages/";
  const EMPTY_HEART = "🤍";
  const FULL_HEART = "💖";

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상 태 변 수 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [goods, setGoods] = useState([]); // 페이지에 사용되는 goods
  // const [inputKeyword, setInputKeyword] = useState(searchKeyword); // searchKeyword의 초기값을 inputKeyword로 설정

  // 검색 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [type, setType] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("desc");
  // 안전하게 URL에서 직접 읽기
  const [page, setPage] = useState(
    parseInt(new URLSearchParams(location.search).get("page")) || 0
  );

  // 페이징 정보 상태변수 (현재 페이징 상태 핸들링 위함)
  const [paging, setPaging] = useState({
    start: 0,
    end: 4,
    isPrev: false,
    isNext: true,
    totalElement: 0,
    totalPages: 0,
  });

  // 검 색 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const params = new URLSearchParams(location.search);

  // input 상태 관리 (검색어 입력창과 싱크 맞추기)
  // 검색창에 입력한 값 inputKeyword에 저장

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 함 수 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  //검색 기능
  //검색 버튼 클릭
  const searchClick = (e) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    params.set("searchType", type);
    params.set("searchKeyword", keyword);
    params.set("sort", sort);
    params.set("page", 0);
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  //검색버튼 엔터
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      //검색
      searchClick();
    }
  };

  // 상품1개 클릭시
  const clickProd = (item) => {
    alert(
      `clickProd 선택된 상품: ${item.goodsId}, ${item.goodsName}, ${item.goodsState}, ${item.description}, ${item.price}`
    );
    navigate("/goods/order", { state: { goods: item } });
  };

  // 별점 (배열)
  const renderStars = (rating) => {
    return "⭐".repeat(Math.floor(rating)); // 반올림이나 소수점 무시
  };

  // 페이징
  const getPageList = async () => {
    // 검색조건 (URL에서 추출)
    const params = new URLSearchParams(location.search);

    const searchKeyword = params.get("searchKeyword") || ""; // 검색어
    const searchType = params.get("searchType") || "all"; // 검색필터
    const sortParam = params.get("sort") || "desc";
    const pageParam = parseInt(params.get("page")) || 0;
    const pages = {
      page: pageParam,
      size: 8,
      sortBy: sortParam,
      keyword: searchKeyword,
      type: searchType,
    };
    try {
      const result = await GoodsApi.getGoodsPageList(pages);
      // 1. 상품 목록
      setGoods(result.content);

      // 2. 페이지번호 정보
      let temp = Math.floor(pageParam / 5) * 5;
      setPaging({
        start: temp,
        end: Math.min(temp + 5, result.totalPages),
        isPrev: result.prev,
        isNext: result.next,
        totalElement: result.totalElements,
        totalPages: result.totalPages,
      });
    } catch (err) {
      console.error("getPageList 실패: ", err);
    }
  };

  // 페이징, 검색 조건
  useEffect(() => {
    // URL 쿼리스트링 기반으로 상태 세팅
    const params = new URLSearchParams(location.search);
    setKeyword(params.get("searchKeyword") || "");
    setType(params.get("searchType") || "all");
    setSort(params.get("sort") || "desc");
    getPageList();
  }, [page, location.search]);

  return (
    <GoodsListComp>
      <div className="container">
        <div>
          <form
            className="search-bar"
            style={{
              display: "flex",
              alignItems: "center",
              margin: "30px 0 0 0",
            }}
            onSubmit={(e) => {
              e.preventDefault(); // 폼 제출 시 새로고침 방지
              searchClick();
            }}
          >
            <div className="custom-select">
              <select
                name="sort"
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="desc">최신순</option>
                <option value="asc">오래된 순</option>
              </select>
              <select
                name="type"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="all">전체</option>
                <option value="food">사료</option>
                <option value="snack">간식</option>
              </select>
            </div>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="search_btn" onClick={() => searchClick()}>
              <span role="img" aria-label="search">
                🔍
              </span>
            </button>
          </form>
        </div>
        <br />
        <br />
        <hr />
        <div className="body">
          <h2>BEST SELLER</h2>
          <section className="list">
            {Array.isArray(goods) &&
              goods?.map((item, index) => (
                <div
                  className="goodslist"
                  key={index}
                  onClick={() => clickProd(item)}
                >
                  <img
                    src={`${imgUrl}${item.imageFile}`}
                    alt={item.goodsName}
                    className="prodimg"
                  />
                  <div>
                    <b>{item.goodsName} </b>
                  </div>
                  <div>
                    {item.description} {", "}
                    {item.quantity} 개
                  </div>
                  <div>{item.price} 원</div>
                  <div>
                    <span>{renderStars(item.rating)}</span>
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {" "}
                      {"( " + item.reviewNum + " )"}{" "}
                    </span>
                  </div>
                </div>
              ))}
          </section>
          <PageNumber
            page={page}
            setPage={(p) => {
              const newParams = new URLSearchParams(location.search);
              newParams.set("page", p);
              navigate({
                pathname: location.pathname,
                search: newParams.toString(),
              });
            }}
            paging={paging}
          />
          <br />
          <hr />
          <h2>자주 산 상품</h2>

          <section className="list">
            {Array.isArray(goods) &&
              goods.map((item, index) => (
                <div
                  className="goodslist"
                  key={index}
                  onClick={() => clickProd(item)}
                >
                  <img
                    src={`${imgUrl}${item.imageFile}`}
                    alt={item.goodsName}
                    className="prodimg"
                  />
                  <div>
                    <b>{item.goodsName} </b>
                  </div>
                  <div>
                    {item.description} {", "}
                    {item.quantity} 개
                  </div>
                  <div>{item.price} 원</div>
                  <div>
                    <span>{renderStars(item.rating)}</span>
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {" "}
                      {"( " + item.reviewNum + " )"}{" "}
                    </span>
                  </div>
                </div>
              ))}
          </section>

          <section className="list1">
            <img src={goodsImg} alt="" className="prodimg" />
            <div>상품명</div>
          </section>
          <hr />
          <h2>판매특가</h2>
          <section className="list2"></section>
        </div>
      </div>
    </GoodsListComp>
  );
}
