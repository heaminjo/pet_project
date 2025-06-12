import { useEffect, useState } from "react";
import styled from "styled-components";
import GoodsApi from "../../api/GoodsApi";
import React from "react";

export default function BannerSelect() {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    getBanner();
  }, []);

  //배너 상품 가져오기
  const getBanner = async () => {
    const result = await GoodsApi.getBanner();

    setBanner(result);
    console.log(result);
  };
  return (
    <BannerSelectComp>
      <div className="select_container">
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
                          <button>삭제</button>
                        </div>
                      </React.Fragment>
                    ))
                ) : (
                  <div className="banner_sel">
                    <button className="banner_sel">배너 선택</button>
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
const BannerSelectComp = styled.div`
  width: 1050px;
  .select_container {
    width: 100%;
    .banner_list {
      width: 100%;
      height: 350px;
      h3 {
        text-align: center;
        margin-bottom: 20px;
      }
      ul {
        display: flex;
        width: 100%;
        gap: 10px;
        li {
          width: 200px;
          height: 200px;
          border: 1px solid #aaa;
          box-shadow: 3px 3px 3px #aaa;
          border-radius: 10px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
          p {
            text-align: center;
            /* line-height: 200px; */
          }
          .banner_text {
            margin-top: 10px;
          }
          .banner_mod {
            display: flex;
            gap: 1px;
            button {
              margin-top: 17px;
              width: 100px;
              height: 41px;
            }
            button:nth-child(1) {
              background-color: #ffffd0;
              border: 2px solid #dcdc98;
            }
            button:nth-child(2) {
              background-color: #eaeaea;
              border: 2px solid #b0b0b0;
            }
          }
          .banner_sel {
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
        }
        button {
          font-weight: bold;
          border: none;
          cursor: pointer;
        }
        button:hover {
          background-color: #bbb;
        }
      }
    }
  }
`;
