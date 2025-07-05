import styled from "styled-components";
import GoodsApi from "../../api/GoodsApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function Best() {
  const [best, setBest] = useState([]);
  const navigate = useNavigate();

  const [stars, setStars] = useState(); // ⭐

  useEffect(() => {
    getBest();
  }, []);

  //베스트 상품 가져오기
  const getBest = async () => {
    const result = await GoodsApi.getBest();

    setBest(result);
  };

  // 별점 (배열)
  const renderStars = (rating) => {
    // return '⭐'.repeat(Math.floor(rating)); // 반올림이나 소수점 무시
    const stars = [];
    const fullStars = Math.floor(rating); // 채운 별 수
    const emptyStars = 5 - fullStars; // 빈 별 수
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} color="gold" size={24} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} color="lightgray" size={24} />);
    }
    return stars;
  };

  return (
    <BestComp>
      <div className="best_inner">
        <div className="title">
          <h2>오늘의 추천 상품</h2>
        </div>
        <div className="best_container">
          <ul>
            {best?.map((b) => (
              <li
                onClick={() =>
                  navigate("/goods/order", { state: { goods: b } })
                }
              >
                <div className="goods_image">
                  <img src={b.imageFile} alt="베스트 상품 이미지" />
                </div>
                <div className="goods_text">
                  <h4>{b.goodsName}</h4>
                  <p>{b.description}</p>
                </div>
                <div className="goods_rating">
                  <span style={{ textAlign: "center" }}>
                    {renderStars(b.rating)}
                  </span>
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {"( " + b.reviewNum + " )"}{" "}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </BestComp>
  );
}
const BestComp = styled.div`
  width: 100%;

  .best_inner {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    @keyframes best {
      0% {
        transform: scale(0.7);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(0.7);
      }
    }
    .title {
      width: 300px;
      margin: 0 auto;
      padding: 20px 0;
      border-radius: 10px;
      background-color: pink;
      border: 1px solid #fff;
      height: 40px;
      box-shadow: 1px 1px 1px #555;
      position: relative;
      h2 {
        position: absolute;
        right: 65px;
        color: #fff;
        text-shadow: 1px 1px 1px #000;

        animation: 1s best infinite;
      }
    }
    .best_container {
      margin: 0 auto;
      height: 320px;
      border: 1px solid #ccc;
      box-shadow: 3px 3px 3px #ccc;
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      @media (max-width: 767px) {
        width: 100%;
        height: auto;
        padding: 0;
        border: none;
        box-shadow: none;
      }
      ul {
        display: flex;
        @media (max-width: 767px) {
          width: 100%;
          flex-direction: column;
          gap: 20px;
        }
        li {
          cursor: pointer;
          width: 100%;
          height: 100%;
          border-right: 1px solid #ccc;
          padding: 10px 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          @media (max-width: 767px) {
            width: 300px;
            height: 400px;
            border: none;
            margin: 0 auto;
            padding: 0;
            border: 1px solid #ccc;
            box-shadow: 3px 3px 3px #ccc;
          }

          .goods_image {
            width: 100%;
            height: 200px;
            @media (max-width: 767px) {
              height: 250px;
              width: 250px;
              margin: 0 auto;
              border-radius: 20px;
              padding: 10px 0;
              img {
                border-radius: 20px;
                border: 1px solid #ccc;
              }
            }
            img {
              width: 100%;
              height: 100%;
              transition: transform 0.3s ease; /* 부드러운 애니메이션 */
            }
            img:hover {
              transform: scale(1.1);
            }
          }
          .goods_text {
            height: 70px;
            @media (max-width: 767px) {
              text-align: center;
              font-size: 15px;
            }
          }
          .goods_rating {
            @media (max-width: 767px) {
              text-align: center;
            }
          }
        }
        li:nth-last-child(1) {
          border: none;
        }
        @media (max-width: 767px) {
          li:nth-last-child(1) {
            border: 1px solid #ccc;
          }
        }
      }
    }
  }
`;
