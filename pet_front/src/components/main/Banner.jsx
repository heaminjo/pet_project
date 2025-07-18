import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import AdminApi from "../../api/AdminApi";
import GoodsApi from "../../api/GoodsApi";
function Banner() {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    getBanner();
  }, []);

  //배너 상품 가져오기
  const getBanner = async () => {
    const result = await GoodsApi.getBanner();

    setBanner(result);
  };
  const sliderRef = useRef(null);

  const settings = {
    dots: true, //점 표시
    infinite: true, //무한 재생
    slidesToShow: 1, //한 화면에 보여줄 이미지
    slidesToScroll: 1,
    autoplay: true, //자동 재생
    speed: 700, //슬라이드 이동 속도
    autoplaySpeed: 3000, //슬라이드간 대기 시간
    cssEase: "ease-in-out", //애니메이션 효과
    nextArrow: <NextArrow sliderRef={sliderRef} />,
    prevArrow: <PrevArrow sliderRef={sliderRef} />,
  };
  return (
    <BannerComp>
      <div className="slider-container">
        {banner.length == 1 ? (
          <div className="item" id="item_1">
            <img src={banner[0]?.imageFile} alt="배너 이미지" />
          </div>
        ) : (
          <Slider {...settings} ref={sliderRef}>
            {banner.map((b) => (
              <div className="item" id="item_1">
                <img src={b.imageFile} alt="배너 이미지" />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </BannerComp>
  );
}

export default Banner;
const BannerComp = styled.div`
  height: calc(100vh - 200px);
  width: 100%;
  @media (max-width: 767px) {
    width: 100vw;
    height: 50%;
  }
  .slider-container {
    width: 100%;
    height: 90%;
    border-radius: 40px;

    .item {
      width: 100%;
      margin-bottom: 50px;
      border-bottom: 2px solid #555;

      img {
        width: 100%;
        margin: 0 auto;
        height: 400px;
      }
    }
  }
  .slick-slide:focus,
  .slick-slider:focus,
  [class*="sc-"]:focus {
    outline: none !important;
    box-shadow: none !important;
  }
`;

//다음 버튼 킄ㄹ릭시 자동재생 중지 더 빠르게게
function NextArrow({ sliderRef }) {
  const clickNext = () => {
    console.log("실행");
    sliderRef.current?.slickNext();
  };
  return (
    <ArrowComp>
      <div className="custom-arrow next" onClick={clickNext}>
        ▶
      </div>
    </ArrowComp>
  );
}

//이전버튼 클릭 시 자동 재생을 멈추고 뒤로 이동 속도도 더 빠르게게
function PrevArrow({ sliderRef }) {
  const clickPrev = () => {
    sliderRef.current?.slickPrev();
  };
  return (
    <ArrowComp>
      <div className="custom-arrow prev" onClick={clickPrev}>
        ◀
      </div>
    </ArrowComp>
  );
}
const ArrowComp = styled.div`
  .custom-arrow {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: #000;
    color: #fff;
    text-align: center;
    line-height: 50px;
    font-size: 30px;
    opacity: 0.5;
    position: absolute;
    z-index: 100;
    top: 180px;
    cursor: pointer;
  }
  .prev {
    left: 30px;
  }
  .next {
    right: 30px;
  }
`;
