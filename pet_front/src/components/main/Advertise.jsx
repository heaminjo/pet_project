import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import GoodsApi from '../../api/GoodsApi';
import { FaStar, FaRegStar } from 'react-icons/fa';

export default function Advertise({ type, title, description }) {
  const [banner, setBanner] = useState([]);

  // 광고 상품 가져오기
  const getAdvertise = async () => {
    try {
      const result = await GoodsApi.getAdvertise(type);
      console.log('광고 응답 데이터:', result.data);
      setBanner(result);
    } catch (e) {
      console.error(`Failed to load ${type} section`, e);
    }
  };
  const sliderRef = useRef(null);

  const settings = {
    dots: true, //점 표시
    infinite: banner?.length >= 6, //무한 재생
    slidesToShow: banner?.length >= 6 ? 6 : banner?.length || 1, //한 화면에 보여줄 이미지
    slidesToScroll: banner?.length >= 6 ? 6 : banner?.length || 1,
    autoplay: false, //자동 재생
    speed: 500, //슬라이드 이동 속도
    // autoplaySpeed: 3000, //슬라이드간 대기 시간
    cssEase: 'ease-in-out', //애니메이션 효과
    nextArrow: <NextArrow sliderRef={sliderRef} />,
    prevArrow: <PrevArrow sliderRef={sliderRef} />,
  };

  // 별점 (배열)
  const renderStars = (rating) => {
    // return '⭐'.repeat(Math.floor(rating)); // 반올림이나 소수점 무시
    const stars = [];
    const fullStars = Math.floor(rating); // 채운 별 수
    const emptyStars = 5 - fullStars; // 빈 별 수
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} color='gold' size={24} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} color='lightgray' size={24} />);
    }
    return stars;
  };

  useEffect(() => {
    console.log(`[Advertise] ${type} 데이터 요청`);
    getAdvertise();
    console.log(banner?.length);
  }, [type]);

  return (
    <AdvertiseComp>
      <div className='advertise_inner'>
        <div className='advertise_title'>
          <h2>{title}</h2>
          <h3>{description}</h3>
        </div>
        <div className='advertise_container'>
          {banner?.length > 0 ? (
            <Slider {...settings} ref={sliderRef}>
              {banner?.map((item, i) => (
                <ul>
                  <li>
                    <div className='advertise_item' key={i}>
                      <img src={item.imageFile} alt={`${title} 이미지`} />
                    </div>
                    <div className='advertise_goods_text'>
                      <h4>{item.goodsName}</h4>
                      <p>{item.description}</p>
                    </div>
                    <div className='advertise_goods_rating'>
                      <span style={{ textAlign: 'center' }}>{renderStars(item.rating)}</span>
                      <span style={{ color: 'red', fontSize: '12px' }}>{'( ' + item.reviewNum + ' )'} </span>
                    </div>
                  </li>
                </ul>
              ))}
            </Slider>
          ) : (
            <p>상품을 불러오는 중입니다...</p>
          )}
        </div>
      </div>
    </AdvertiseComp>
  );
}

const AdvertiseComp = styled.div`
  width: 100%;
  .advertise_inner {
    margin-top: 100px;
    width: 1400px;
    height: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    @keyframes best {
      0% {
        transform: scale(0.95);
      }
      50% {
        transform: scale(1);
      }
      100% {
        transform: scale(0.95);
      }
    }
    .advertise_title {
      width: 500px;
      margin: 0 auto;
      margin-top: 50px;
      padding: 10px 0;
      background-color: rgb(255, 255, 255);
      height: auto; /* height 고정 X */
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      h2 {
        color: rgb(88, 84, 84);
        text-shadow: 1px 1px 1px #000;
        animation: 1s best infinite;
        font-size: 30px;
        margin: 0;
      }
      h3 {
        color: rgb(110, 107, 107);
        font-size: 14px;
        color: #666;
        font-size: 18px;
        margin: 0;
      }
    }
    .advertise_container {
      height: 300px;
      //border: 1px solid #ccc;
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .slick-slider {
        padding: 30px; /* 점 공간 확보 */
      }
      .slick-dots {
        display: flex !important;
        justify-content: center;
        align-items: center;
        flex-direction: row !important;
        gap: 8px;
        position: absolute;
        bottom: -20px;
        width: 100%;
        padding: 0;
        margin: 50;
        list-style: none;
      }
      .slick-dots li button:before {
        font-size: 10px;
        color: #aaa;
        opacity: 1;
      }
      .slick-dots li.slick-active button:before {
        color: #333;
      }

      ul {
        gap: 10px;

        li {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-content: center;
          gap: 10px;

          .advertise_item {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            img {
              height: 150px;
              padding: 20px;
              transition: transform 0.3s ease; /* 부드러운 애니메이션 */
            }
          }
          .advertise_item:hover {
            transform: scale(1.1);
          }
          .advertise_goods_text {
            height: 70px;
            P {
              font-size: 14px;
            }
          }
          .advertise_goods_rating {
          }
        }
      }
    }
  }
  .slick-slide:focus,
  .slick-slider:focus,
  [class*='sc-']:focus {
    outline: none !important;
    box-shadow: none !important;
  }
`;

//다음 버튼 클릭시 자동재생 중지 더 빠르게게
function NextArrow({ sliderRef }) {
  const clickNext = () => {
    console.log('실행');
    sliderRef.current?.slickNext();
  };
  return (
    <ArrowComp>
      <div className='custom-arrow next' onClick={clickNext}>
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
      <div className='custom-arrow prev' onClick={clickPrev}>
        ◀
      </div>
    </ArrowComp>
  );
}
const ArrowComp = styled.div`
  .custom-arrow {
    width: 30px;
    height: 300px;
    border-radius: 100%;
    // background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    text-align: center;
    line-height: 30px;
    font-size: 20px;
    opacity: 0.5;
    position: absolute;
    z-index: 100;
    top: 50%;
    cursor: pointer;
  }
  .prev {
    left: -50px;
  }
  .next {
    right: -50px;
  }
`;
