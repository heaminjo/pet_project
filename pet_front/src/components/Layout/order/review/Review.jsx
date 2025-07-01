import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import OrderApi from "../../../../api/OrderApi";
import { FaStar, FaRegStar } from "react-icons/fa";

// 리뷰 페이지
export default function Review() {
  const navigate = useNavigate();
  const location = useLocation();

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상 태 변 수 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 이미지 및 파일 state
  const [prevImg, setPrevImg] = useState([]); // 기존 이미지 URL들
  const [userImage, setUserImage] = useState([]); // 새로 업로드된 File들

  // const { goods, review } = location.state || ''; // 리뷰작성 시만
  const locationState = location.state || {};
  const orderDetail = locationState.orderDetail || null; // OrderDetailResponseDTO
  const review = locationState.review || null;

  // form 필드 state
  const [title, setTitle] = useState(""); // 문자열 초기화
  const [content, setContent] = useState(""); // 문자열 초기화

  // goodsId와 reviewId 저장
  const [goodsId, setGoodsId] = useState("");
  const reviewId = review?.reviewId; // null 이면 작성모드
  const orderDetailId = orderDetail?.orderDetailId;
  // const orderDetailId = searchParams.get('orderDetailId');

  // 리뷰 ID
  const searchParams = new URLSearchParams(location.search);

  const up = "up.png";
  const down = "down.png";
  const prodImg = "istockphoto-1320314988-2048x2048.jpg";

  // c:\devv\pet_project\pet_back\src\main\resources\webapp\userImages\up.png

  // 별점 (배열)
  const [score, setScore] = useState(0); // ⭐ 🤍❤️

  const renderStars = (rating) => {
    return "⭐".repeat(Math.floor(rating)); // 반올림이나 소수점 무시
  };

  // 이미지 제거
  const removeImage = (index) => {
    setUserImage((prev) => prev.filter((_, i) => i !== index));
    setPrevImg((prev) => prev.filter((_, i) => i !== index));
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~ 리뷰등록 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 리뷰 조회

  // 리뷰 등록
  const regReview = async () => {
    const review = {
      memberId: "",
      orderDetailId: orderDetailId,
      goodsId,
      score,
      title,
      content,
    };

    const formData = new FormData();
    const jsonBlob = new Blob([JSON.stringify(review)], {
      type: "application/json",
    });
    formData.append("review", jsonBlob);
    userImage.forEach((file) => formData.append("imageFile", file));

    try {
      const response = await OrderApi.registerReview(formData);
      alert("리뷰가 등록되었습니다!");
      navigate("/user/mypage/myreview");
    } catch (err) {
      console.error("리뷰 등록 실패", err);
      alert("리뷰 등록 중 오류가 발생했습니다.");
    }
  };

  // 리뷰 수정
  const updateReview = async () => {
    const review = {
      memberId: "",
      reviewId: review.reviewId,
      score: score,
      title: title,
      content: content,
    };

    const formData = new FormData();
    const jsonBlob = new Blob([JSON.stringify(review)], {
      type: "application/json",
    });
    formData.append("review", jsonBlob);
    userImage.forEach((file) => formData.append("imageFile", file));

    try {
      const response = await OrderApi.updateReview(formData);
      alert("리뷰가 수정되었습니다!");
      navigate("/user/mypage/myreview");
    } catch (err) {
      console.error("리뷰 수정 실패", err);
      alert("리뷰 수정 중 오류가 발생했습니다.");
    }
  };

  // 모드 분기: useEffect 내부에서 초기화
  useEffect(() => {
    if (review) {
      // 수정 모드
      setGoodsId(review.goods.goodsId);
      setTitle(review.title);
      setContent(review.content);
      setScore(review.score);

      if (review.imageFile) {
        const imgArr = review.imageFile.split(",").map((s) => s.trim());
        setPrevImg(imgArr);
      }
    } else if (orderDetail) {
      // 등록 모드
      setGoodsId(orderDetail.goodsId);
    } else {
      // 이상 시 홈으로 리다이렉트 방지
      console.error("goods와 review 정보가 모두 없습니다!");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [orderDetail, review]);

  useEffect(() => {
    if (orderDetail) {
      console.log(`goods = `, orderDetail);
      console.log(`review = `, review);
      console.log(`goods 정보 확인 : ${Object.keys(orderDetail)}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [orderDetail]);

  return (
    <ReviewComp>
      <div className="container">
        <h2>{reviewId ? "리뷰 수정" : "리뷰 작성"}</h2>
        <div className="prod-info">
          {review && (
            <img
              src={`${review.goods.imageFile}`}
              alt=""
              style={{ width: "400px", height: "400px" }}
              className="prod-img"
            />
          )}
          {orderDetail && (
            <img
              src={`${orderDetail.imageFile}`}
              alt=""
              style={{ width: "400px", height: "400px" }}
              className="prod-img"
            />
          )}

          <div>
            <b>상품명</b>&nbsp;&nbsp;
            {review ? review.goods.goodsName : orderDetail?.goodsName}
          </div>
          <div>
            <b>상세</b>&nbsp;&nbsp;
            {review ? review.goods.description : orderDetail?.description}
          </div>
          <div
            className="star-container"
            style={{
              display: "flex",
              gap: "4px",
              cursor: "pointer",
              fontSize: "28px",
            }}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <FaStar
                key={`star-${i}`}
                color={i <= score ? "gold" : "lightgray"}
                size={60}
                onClick={() => setScore(i)}
                style={{ transition: "color 0.2s" }}
              />
            ))}
          </div>
          <p>선택된 별점: {score}점</p>
        </div>
        <hr />
        <form>
          <fieldset className="reviews">
            <label>
              <input
                type="text"
                name="title"
                className="comment"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="한줄 요약"
              />
            </label>
            <hr />
            <label>
              <textarea
                name="contents"
                className="contents"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="상세 리뷰"
              />
            </label>
          </fieldset>
        </form>
        <hr />
        <form>
          <fieldset className="user-img">
            <legend>
              <strong>사진 첨부</strong>{" "}
            </legend>

            <label htmlFor="upload-input" className="upload-btn">
              이미지 선택
            </label>
            <input
              id="upload-input"
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={(e) => {
                const files = Array.from(e.target.files); // FileList 배열
                setUserImage((prev) => [...prev, ...files]); // 파일 배열로 누적
                // 미리보기 이미지 배열
                const newPreviews = files.map((file) =>
                  URL.createObjectURL(file)
                );
                setPrevImg((prev) => [...prev, ...newPreviews]); // prevImg 배열
              }}
            />
            <div className="preview-container">
              {prevImg.length === 0 ? (
                <></>
              ) : (
                prevImg.map((src, idx) => (
                  <div key={idx}>
                    <img
                      src={src}
                      alt="미리보기"
                      className="goodsImg"
                      style={{ width: "200px", height: "200px" }}
                    />
                    <button onClick={() => removeImage(idx)}>X</button>
                  </div>
                ))
              )}
            </div>
          </fieldset>
        </form>
        <section>
          <button className="pay" onClick={review ? updateReview : regReview}>
            {review ? "리뷰수정" : "리뷰등록"}
          </button>
          &nbsp;&nbsp;{" "}
          <button className="cancel" onClick={() => navigate("/")}>
            취소
          </button>
        </section>
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

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 사진 첨부 영역 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  .user-img {
    border: none;
    margin: 24px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .user-img legend {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .user-img input[type="file"] {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    cursor: pointer;
    background-color: #f8f8f8;
    font-size: 14px;
    width: fit-content;
  }

  .preview-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
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

  .preview-box {
    position: relative;
    width: 160px;
    height: 160px;
    border: 1px solid #ddd;
    border-radius: 12px;
    background-color: #f2f2f2;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
    transition: transform 0.2s ease;
  }

  .preview-box:hover {
    transform: translateY(-2px);
  }

  .preview-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .preview-box button {
    position: absolute;
    top: 8px;
    right: 8px;
    background-color: black;
    color: white;
    border: none;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
  }

  .preview-box button:hover {
    background-color: red;
  }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~ 버튼 스타일 공통화 ~~~~~~~~~~~~~~~~~~~~~ */
  button.pay,
  button.cancel {
    padding: 10px 24px;
    font-size: 15px;
    font-weight: bold;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    transition: background-color 0.2s ease;
  }

  button.pay {
    background-color: #ff6b6b;
    color: white;
  }

  button.pay:hover {
    background-color: #fa5252;
  }

  button.cancel {
    background-color: #e0e0e0;
    color: #333;
  }

  button.cancel:hover {
    background-color: #d0d0d0;
  }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 업로드 버튼 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  .upload-btn {
    width: 70px;
    display: inline-block;
    padding: 10px 16px;
    background-color: #ff6b6b;
    color: white;
    font-size: 14px;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s ease;
  }

  .upload-btn:hover {
    background-color: #fa5252;
  }
`;
