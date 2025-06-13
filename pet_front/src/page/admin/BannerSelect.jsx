import { useEffect, useState } from "react";
import styled from "styled-components";
import GoodsApi from "../../api/GoodsApi";
import React from "react";
import Modal from "../../modal/Modal";
import AdminApi from "../../api/AdminApi";
import BannerSelectComp from "./BannerSelectStyle";
import PageNumber from "../../components/util/PageNumber";
import GoodsSelectList from "../../components/util/GoodsSelectList";
export default function BannerSelect() {
  const [banner, setBanner] = useState([]); //배너 데이터
  const [modal, setModal] = useState(false); //삭제 확인 모달
  const [selBanner, setSelBanner] = useState(0); //선택된 배너(삭제,수정,선택)

  const [selectView, setSelectView] = useState(false); //상품 선택 창 여부

  useEffect(() => {
    getBanner();
  }, []);

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
        {selectView && <GoodsSelectList selectEvt={clickSelect} />}
      </div>
    </BannerSelectComp>
  );
}
