import GoodsListComp from "./GoodsListStyle.js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import GoodsApi from "../../../api/GoodsApi";
import PageNumber from "../../util/PageNumber.jsx";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function GoodsList() {
  const navigate = useNavigate();
  const location = useLocation();

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상 태 변 수 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [goods, setGoods] = useState([]); // 페이지에 사용되는 goods

  // 카테고리
  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("desc");

  // 페이징 정보 상태변수 (현재 페이징 상태 핸들링 위함)
  const [paging, setPaging] = useState({
    start: 0,
    end: 4,
    isPrev: false,
    isNext: true,
    totalElement: 0,
    totalPages: 0,
  });

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 함 수 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // 카테고리 로딩
  const getCategoryList = async () => {
    try {
      const response = await GoodsApi.getCategoryList();
      setCategories(response);
    } catch (error) {
      console.error("카테고리 불러오기 실패:", error);
    }
  };

  // 상품1개 클릭시
  const clickProd = (item) => {
    console.log(
      `clickProd 선택된 상품: ${item.goodsId}, ${item.goodsName}, ${item.goodsState}, ${item.description}, ${item.price}`
    );
    navigate("/goods/order", { state: { goods: item } });
  };

  // 별점 (배열)
  const renderStars = (rating) => {
    // return '⭐'.repeat(Math.floor(rating)); // 반올림이나 소수점 무시
    const stars = [];
    const fullStars = Math.floor(rating); // 채운 별 수
    const emptyStars = 5 - fullStars; // 빈 별 수
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} color="gold" size={16} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} color="lightgray" size={16} />);
    }
    return stars;
  };

  // 페이징
  // 상품 데이터 조회 함수
  const getPageList = async () => {
    const pages = {
      page,
      size: 8,
      sortBy: sort,
      keyword,
      category, // 카테고리
    };

    try {
      const result = await GoodsApi.getGoodsPageList(pages);
      setGoods(result.content);

      let temp = Math.floor(page / 5) * 5;
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

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ useEffect ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // 페이징, 검색 조건
  useEffect(() => {
    getCategoryList();
    getPageList();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, category, keyword, sort]);

  return (
    <GoodsListComp>
      <div className="container">
        <div className="search-bar">
          <div className="custom-select">
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="desc">최신순</option>
              <option value="asc">오래된 순</option>
            </select>
            <select
              value={category}
              onChange={(e) => {
                setCategory(parseInt(e.target.value));
              }}
            >
              <option value="0">전체</option>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            defaultValue={keyword} //
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setPage(0); // 검색어 입력시 페이지 초기화
              }
            }}
            onBlur={(e) => setKeyword(e.target.value)}
          />
          <button
            className="search_btn"
            onClick={(e) => {
              e.preventDefault();
              setPage(0); // 검색 버튼 클릭 시 페이지 초기화
            }}
          >
            <span role="img" aria-label="search">
              🔍
            </span>
          </button>
        </div>
        <div className="body">
          <section className="list">
            {Array.isArray(goods) &&
              goods?.map((item, index) => (
                <div
                  className="goodslist"
                  key={index}
                  onClick={() => clickProd(item)}
                >
                  <div className="img-container">
                    <img
                      src={`${item.imageFile}`}
                      alt={item.goodsName}
                      className="prodimg"
                    />
                  </div>

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
          <PageNumber page={page} setPage={setPage} paging={paging} />
        </div>
      </div>
    </GoodsListComp>
  );
}
