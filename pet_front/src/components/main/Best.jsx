import styled from "styled-components";
import GoodsApi from "../../api/GoodsApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Best() {
  const [best, setBest] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getBest();
  }, []);

  //베스트 상품 가져오기
  const getBest = async () => {
    const result = await GoodsApi.getBest();

    setBest(result);
    console.log(result);
  };

  // 별점 (배열)
  const renderStars = (rating) => {
    return "⭐".repeat(Math.floor(rating)); // 반올림이나 소수점 무시
  };
  return (
    <BestComp>
      <h2>오늘의 추천 상품</h2>
      <div className="best_container">
        <ul>
          {best?.map((b) => (
            <li
              onClick={() => navigate("/goods/order", { state: { goods: b } })}
            >
              <div className="goods_image">
                <img src={b.imageFile} alt="베스트 상품 이미지" />
              </div>
              <div className="goods_text">
                <h4>{b.goodsName}</h4>
                <p>{b.description}</p>
              </div>
              <div className="goods_rating">
                <span>{renderStars(b.rating)}</span>
                <span style={{ color: "red", fontSize: "12px" }}>
                  {"( " + b.reviewNum + " )"}{" "}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </BestComp>
  );
}
const BestComp = styled.div`
  width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  h2 {
    padding: 20px 0;
    background-color: pink;
    border-radius: 10px;
    color: #fff;
    text-shadow: 1px 1px 1px #000;
    text-align: center;
    width: 300px;
    box-shadow: 1px 1px 1px #555;
    border: 1px solid #fff;
    margin: 0 auto;
  }
  .best_container {
    width: 100%;
    height: 320px;
    border: 1px solid #ccc;
    box-shadow: 3px 3px 3px #ccc;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    ul {
      display: flex;
      li {
        cursor: pointer;
        width: 220px;
        height: 100%;
        border-right: 1px solid #ccc;
        padding: 10px 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        .goods_image {
          width: 100%;
          height: 200px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .goods_text {
          height: 70px;
        }
      }
      li:nth-last-child(1) {
        border: none;
      }
    }
  }
`;
