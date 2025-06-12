import { useEffect, useState } from "react";
import styled from "styled-components";
import GoodsApi from "../../api/GoodsApi";
import React from "react";
import Modal from "../../modal/Modal";
import AdminApi from "../../api/AdminApi";
import BannerSelectComp from "./BannerSelectStyle";
import searchIcon from "../../images/free-icon-search-149852.png";
import PageNumber from "../../components/util/PageNumber";
export default function BannerSelect() {
  const [banner, setBanner] = useState([]); //배너 데이터
  const [modal, setModal] = useState(false); //삭제 확인 모달
  const [selBanner, setSelBanner] = useState(0); //선택된 배너(삭제,수정,선택)
  const [categoryList, setCategoryList] = useState([]); //카테고리 리스트
  const [selectView, setSelectView] = useState(false); //상품 선택 창 여부
  const [goodsList, setGoodsList] = useState([]);

  //페이지
  const [category, setCategory] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [paging, setPaging] = useState([]);

  useEffect(() => {
    getBanner();
    getCategoryList(); //카테고리 호출
  }, []);

  useEffect(() => {
    getGoodsList(); //상품 리스트 호출
  }, [page, category]);
  //배너 상품 가져오기
  const getBanner = async () => {
    const result = await GoodsApi.getBanner();

    setBanner(result);
    console.log(result);
  };

  //배너 삭제 클릭(삭제 확인)
  const clickBannerDelete = (id) => {
    //현재 선택된 배너 아이디 저장
    setSelBanner(id);
    setModal(true);
  };
  //배너 삭제
  const bannerDelete = async () => {
    const result = await AdminApi.bannerDelete(selBanner);
    setModal(false);

    alert(result.message);
    getBanner();
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

  //검색버튼 엔터
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      //검색
      getGoodsList();
    }
  };

  //배너 상품 선택 클릭
  const clickSelect = async (id) => {
    console.log(setBanner);
    const newBanner = {
      goodsId: id,
      position: selBanner,
    };
    const result = await GoodsApi.bannerInsert(newBanner);
    alert(result.message);
    setSelectView(false);
    getBanner();
  };
  return (
    <BannerSelectComp>
      <div className="select_container">
        {modal && (
          <div className="modal">
            <Modal
              setModal={setModal}
              content={"정말 삭제하시겠습니까?"}
              clickEvt={bannerDelete}
            />
          </div>
        )}
        <div className="banner_list">
          <h3>배너 상품 관리</h3>
          <ul>
            {[...Array(5)].map((_, i) => (
              <li key={i}>
                {banner.some((b) => b.position === i + 1) ? (
                  banner
                    .filter((b) => b.position === i + 1)
                    .map((b) => (
                      <React.Fragment key={b.position}>
                        <img src={b.imageFile} alt="배너 이미지" />
                        <div className="banner_text">
                          <p>[{b.categoryName}]</p>
                          <p>{b.goodsName}</p>
                        </div>
                        <div className="banner_mod">
                          <button onClick={() => clickBannerDelete(b.bannerId)}>
                            삭제
                          </button>
                        </div>
                      </React.Fragment>
                    ))
                ) : (
                  <div className="banner_sel">
                    <button
                      onClick={() => {
                        setSelectView(true);
                        setSelBanner(i + 1);
                        console.log(i + 1);
                      }}
                      className="banner_sel"
                    >
                      배너 선택
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        {selectView && (
          <div className="goods_select">
            <h3>배너 상품 선택</h3>
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
                      <button onClick={() => clickSelect(g.goodsId)}>
                        선택
                      </button>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
            <PageNumber page={page} setPage={setPage} paging={paging} />
          </div>
        )}
      </div>
    </BannerSelectComp>
  );
}
