import Modal from "../../modal/Modal";
import BannerSelectComp from "./BannerSelectStyle";
import { useEffect, useState } from "react";
import GoodsApi from "../../api/GoodsApi";
import React from "react";
import AdminApi from "../../api/AdminApi";
import GoodsSelectList from "../../components/util/GoodsSelectList";

export default function BestSelect() {
  const [best, setBest] = useState([]); //배너 데이터
  const [modal, setModal] = useState(false); //삭제 확인 모달
  const [selBest, setSelBest] = useState(0); //선택된 베스트(삭제,수정,선택)
  const [selectImage, setSelectImage] = useState(null); //선택 프로필(서버용)
  const [prevImage, setPrevImage] = useState(null); //이전 프로필필
  const [selectView, setSelectView] = useState(false); //상품 선택 창 여부

  useEffect(() => {
    getBest();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  //베스트 상품 리스트 가져오기
  const getBest = async () => {
    const result = await GoodsApi.getBest();

    setBest(result);
    console.log(result);
  };

  //베스트 삭제 클릭(삭제 확인)
  const clickBannerDelete = (id) => {
    //현재 선택된 배너 아이디 저장
    setSelBest(id);
    setModal(true);
  };

  //선택된 상품이 온다.
  const selectGoods = async (g) => {
    console.log("선택된 배너" + selBest);
    const result = await AdminApi.bestInsert(g.goodsId, selBest);

    alert(result.message);
    console.log(result);
    setSelectView(false);
    getBest();
  };

  //배너 상품 선택 클릭
  const clickSelect = async () => {
    const newBanner = {
      imageFile: selectImage,
      position: selBest,
    };

    const result = await GoodsApi.bannerInsert(newBanner);
    alert(result.message);
    getBest();
  };

  // 별점 (배열)
  const renderStars = (rating) => {
    return "⭐".repeat(Math.floor(rating)); // 반올림이나 소수점 무시
  };

  //베스트 상품 삭제
  const bestDelete = async () => {
    const result = await AdminApi.bestDelete(selBest);
    setModal(false);

    alert(result.message);
    getBest();
  };
  return (
    <BannerSelectComp>
      <div className="select_container">
        {modal && (
          <div className="modal">
            <Modal
              setModal={setModal}
              content={"정말 삭제하시겠습니까?"}
              clickEvt={bestDelete}
            />
          </div>
        )}
        <div className="banner_list">
          <h3>추천 상품 관리</h3>
          <ul>
            {[...Array(4)].map((_, i) => (
              <li key={i}>
                {best.some((b) => b.position === i + 1) ? (
                  best
                    .filter((b) => b.position === i + 1)
                    .map((b) => (
                      <React.Fragment key={b.position}>
                        <img src={b.imageFile} alt="배너 이미지" />
                        <p>{b.goodsName}</p>
                        <div className="banner_mod">
                          <button onClick={() => clickBannerDelete(b.bestId)}>
                            삭제
                          </button>
                        </div>
                      </React.Fragment>
                    ))
                ) : (
                  <div className="banner_sel">
                    {prevImage != null && selBest == i + 1 ? (
                      <React.Fragment>
                        <img src={prevImage} />
                        <div className="banner_mod">
                          <button onClick={() => clickSelect()}>
                            저장하기
                          </button>
                        </div>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <button
                          onClick={() => {
                            setSelectView(true);
                            setSelBest(i + 1);
                            console.log(i + 1);
                          }}
                          className="banner_sel"
                        >
                          상품 선택
                        </button>
                      </React.Fragment>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        {selectView && <GoodsSelectList selectEvt={selectGoods} />}
      </div>
    </BannerSelectComp>
  );
}
