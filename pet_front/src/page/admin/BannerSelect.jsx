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
  const [selectImage, setSelectImage] = useState(null); //선택 프로필(서버용)
  const [prevImage, setPrevImage] = useState(null); //이전 프로필필

  useEffect(() => {
    getBanner();
  }, []);

  //배너 사진진 가져오기
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

  //이미지 체인지
  const changeImage = (e, i) => {
    console.log("클릭 배너 => ", i + 1);
    setSelBanner(i + 1);
    const file = e.target.files[0];
    if (file) {
      //파일 미리보기를 위한 객체
      const reader = new FileReader();

      reader.onloadend = () => {
        //파일 읽기가 끝났을때 자동 실행되어 선택된 이미지 저장
        setPrevImage(reader.result);
      };

      reader.readAsDataURL(file);
      setSelectImage(file);
    }
  };

  //배너 상품 선택 클릭
  const clickSelect = async () => {
    const newBanner = {
      imageFile: selectImage,
      position: selBanner,
    };

    const result = await GoodsApi.bannerInsert(newBanner);
    alert(result.message);
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
                        <div className="banner_mod">
                          <button onClick={() => clickBannerDelete(b.bannerId)}>
                            삭제
                          </button>
                        </div>
                      </React.Fragment>
                    ))
                ) : (
                  <div className="banner_sel">
                    {prevImage != null && selBanner == i + 1 ? (
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
                        <label
                          className="banner_input"
                          htmlFor={"upload__" + i}
                        >
                          배너 이미지 선택
                        </label>
                        <input
                          id={"upload__" + i}
                          type="file"
                          onChange={(e) => changeImage(e, i)}
                          hidden
                        />
                      </React.Fragment>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </BannerSelectComp>
  );
}
