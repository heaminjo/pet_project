import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GoodsApi from "../../../api/GoodsApi";
import OrderApi from "../../../api/OrderApi";
import PageNumber from "../../util/PageNumber";
import { useLocation, useNavigate } from "react-router-dom";

// 리뷰 페이지
export default function Review() {
  const navigate = useNavigate();
  const location = useLocation();
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상 태 변 수 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 이미지 미리보기 위한 상태변수 추가
  const [prevImg, setPrevImg] = useState(
    "http://localhost:8080/resources/webapp/userImages/basicimg.jpg"
  );

  const { goods } = location.state || {};
  const [activeTab, setActiveTab] = useState("상품상세");
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState([]);
  const [content, setContent] = useState([]);
  const [userImage, setUserImage] = useState([]);
  const imgUrl = "http://localhost:8080/resources/webapp/userImages/";
  const up = "up.png";
  const down = "down.png";
  const prodImg = "istockphoto-1320314988-2048x2048.jpg";
  // c:\devv\pet_project\pet_back\src\main\resources\webapp\userImages\up.png

  // 별점 (배열)
  const [stars, setStars] = useState(); // ⭐  🤍❤️

  // 별점 상태추가
  const [score, setScore] = useState(0); // 🤍❤️
  const [isDragging, setIsDragging] = useState(false);

  const renderStars = (rating) => {
    return "⭐".repeat(Math.floor(rating)); // 반올림이나 소수점 무시
  };

  // 보여줄 데이터
  const data = [
    { label: "리뷰 작성", value: goods.goodsName },
    { label: "작성한 리뷰", value: goods.description },
  ];

  // 리뷰등록
  const regReview = async (reviews) => {
    console.log(`별점: ${score}`);
    const review = {
      memberId: "",
      goodsId: goods.goodsId,
      orderDetailId: "",
      score: score, // 여기 중요!
      title: comment,
      content: content,
      imageFile: reviews.imageFile,
    };
    try {
      console.log(`goodsId = ${reviews.goodsId}`);
      const response = await OrderApi.registerReview(review);
      alert(response); // 리뷰가 정상적으로 등록되었습니다.
      navigate("/");
    } catch (err) {
      console.error("리뷰 등록 실패", err);
      alert("리뷰 등록 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    console.log(`goods 정보 확인 : ${Object.keys(goods)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <ReviewComp>
      <div className="container">
        <h2>리뷰작성 페이지</h2>
        <div className="prod-info">
          <img
            src={`${imgUrl}${goods.imageFile}`}
            alt=""
            style={{ width: "400px", height: "400px" }}
            className="prod-img"
          />
          <div>{goods.goodsName}</div>
          <div>{goods.description}</div>
          <div
            className="star-container"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={(e) => {
              if (isDragging) {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const newScore = Math.min(
                  Math.max(Math.ceil((x / rect.width) * 5), 1),
                  5
                );
                setScore(newScore);
              }
            }}
            style={{
              display: "flex",
              gap: "4px",
              cursor: "pointer",
              fontSize: "28px",
            }}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i}>{i <= score ? "❤️" : "🤍"}</span>
            ))}
          </div>
          <p>선택된 별점: {score}점</p>
        </div>
        <hr />
        <form>
          <fieldset className="reviews">
            <legend>
              <strong>한줄요약</strong>
            </legend>
            <label>
              <input
                type="text"
                name="title"
                className="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </label>
            <hr />
            <legend>
              <strong>상세 리뷰</strong>
            </legend>
            <label>
              <textarea
                name="contents"
                className="contents"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </label>
          </fieldset>
        </form>

        <hr />
        <h3>서비스</h3>
        <div className="service">
          <div>[서비스] 전체적인 서비스는 어떠셨나요? (상, 중, 하)</div>
          &nbsp;&nbsp; 😍 &nbsp;&nbsp;🙂 &nbsp;&nbsp;😫 &nbsp;&nbsp;
        </div>
        <hr />
        <h3>품질</h3>
        <div className="quality">
          <div>
            [품질] 이 상품의 품질에 대해서 얼마나 만족하시나요? (상, 중, 하)
          </div>
          &nbsp;&nbsp; 😍 &nbsp;&nbsp;🙂 &nbsp;&nbsp;😫 &nbsp;&nbsp;
        </div>
        <hr />
        <h3>배송</h3>
        <div className="deliver">
          <div>[배송] 배송에 대해서 얼마나 만족하시나요? (상, 중, 하)</div>
          &nbsp;&nbsp; 😍 &nbsp;&nbsp;🙂 &nbsp;&nbsp;😫 &nbsp;&nbsp;
        </div>

        <hr />
        <form>
          <fieldset className="user-img">
            <legend>
              <strong>사진 첨부</strong>{" "}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setReviews({ ...regReview, imageFile: file });
                  if (file) {
                    const imgUrl = URL.createObjectURL(file);
                    setPrevImg(imgUrl); // 미리보기용 이미지주소
                  } else {
                    setPrevImg(prevImg);
                  }
                }}
              />
            </legend>
            <div>
              <img
                src={prevImg}
                alt="상품 이미지"
                className="goodsImg"
                style={{ width: "200px", height: "200px" }}
              />
            </div>
          </fieldset>
        </form>
        <section>
          <button className="pay" onClick={() => regReview(reviews)}>
            리뷰등록
          </button>
          &nbsp;&nbsp;{" "}
          <button className="cancel" onClick={() => navigate("/")}>
            취소
          </button>
        </section>
        {/* <table className='review-table'>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <th className='review-th'>{item.label}</th>
                <td className='review-td'>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
        {/* <PageNumber page={page} setPage={setPage} paging={paging} /> */}
      </div>
    </ReviewComp>
  );
}

const ReviewComp = styled.div`
  .container {
    width: 900px;
    margin: 0 auto;
    font-family: "Arial", sans-serif;
    color: #333;
  }
  .star-container {
    user-select: none; /* 텍스트 선택 비활성화 */
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE/Edge */
  }

  /* 기본 라인 정리 */
  hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 20px 0;
  }

  /* 섹션 타이틀 */
  .container h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 12px;
  }

  .service,
  .quality,
  .deliver {
    display: flex;
    align-items: center;
    font-weight: bold;
    gap: 12px;
    margin-top: 8px;
  }

  /* 상품 품질 리뷰 제목 */
  .prod-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin: 16px 0;
  }

  .prod-info div:nth-child(2) {
    font-weight: bold;
  }

  .prod-info div:nth-child(3) {
    color: #f39c12;
    font-size: 18px;
  }

  /* 질문 섹션 */
  .question fieldset {
    border: none;
    margin-bottom: 24px;
  }

  .question legend {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .question label {
    display: block;
    margin-left: 12px;
    margin-top: 4px;
    font-size: 14px;
  }

  /* 상세 리뷰 입력 */
  .reviews {
    border: none;
  }

  .reviews legend {
    font-size: 16px;
    font-weight: bold;
    margin-top: 12px;
    margin-bottom: 8px;
  }

  .comment {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    margin-bottom: 20px;
    box-sizing: border-box;
  }

  .contents {
    width: 100%;
    height: 150px;
    padding: 10px;
    font-size: 14px;
    resize: vertical;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  /* 사진 첨부 영역 */
  .user-img {
    border: none;
    margin-top: 24px;
  }

  .user-img legend {
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .user-img button {
    background-color: #2563eb;
    color: white;
    border: none;
    padding: 6px 12px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
  }

  .user-img button:hover {
    background-color: #1d4ed8;
  }
`;
