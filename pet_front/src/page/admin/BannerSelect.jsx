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
  const [render, setRender] = useState(false); //강제 랜더링 용용
  const [categoryList, setCategoryList] = useState([]); //카테고리 리스트
  const [selectView, setSelectView] = useState(false); //상품 선택 창 여부

  //페이지
  const [type, setType] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    getBanner();
  }, [render]);

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
    setRender(!render);
  };

  //상품 검색창 열기
  const clickSelect = () => {
    getCategoryList(); //카테고리 호출
    // getGoodsList(); //상품 리스트 호출
    setSelectView(true);
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
      type: type,
    };
    const result = await GoodsApi.getGoodsList(pages);
    console.log(result);
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
                          <button>수정</button>
                          <button onClick={() => clickBannerDelete(b.bannerId)}>
                            삭제
                          </button>
                        </div>
                      </React.Fragment>
                    ))
                ) : (
                  <div className="banner_sel">
                    <button
                      onClick={() => clickSelect()}
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
            <ul className="category_list">
              <li>전체</li>
              {categoryList.map((c) => (
                <li>{c.categoryName}</li>
              ))}
            </ul>
            <div className="search">
              <input
                type="text"
                name="search"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button>
                <img src={searchIcon} alt="검색 아이콘" />
              </button>
            </div>
            <div className="goods_list">d</div>
          </div>
        )}
      </div>
    </BannerSelectComp>
  );
}
