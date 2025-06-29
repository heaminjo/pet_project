import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import OrderApi from "../../../../api/OrderApi";
import PageNumber from "../../../util/PageNumber";

// 리뷰 페이지
export default function MyReview() {
  const navigate = useNavigate();
  const location = useLocation();
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상 태 변 수 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const { goods } = location.state || {};
  const [reviews, setReviews] = useState([]);
  const [openStates, setOpenStates] = useState([]); // 각 리뷰들의 펼침 상태

  // 페이징 관련 상태변수
  const [type, setType] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(0);

  // 페이징 정보 상태변수 (현재 페이징 상태 핸들링 위함)
  const [paging, setPaging] = useState({
    start: 0,
    end: 4,
    isPrev: false,
    isNext: true,
    totalElement: 0,
    totalPages: 0,
  });

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 페이징 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 작성한 리뷰 목록 불러오기
  const getPageList = async () => {
    const pages = {
      page: page,
      size: 5,
      sortBy: sort,
      keyword: keyword,
      type: type,
    };
    try {
      const result = await OrderApi.getReviewsPageList(pages);
      // 1. 리뷰
      setReviews(result.content);

      // 2. 페이지번호 정보
      let temp = Math.floor(page / 5) * 5;
      setPaging({
        start: temp,
        end: Math.min(temp + 5, result.totalPages),
        isPrev: result.prev,
        isNext: result.next,
        totalElement: result.totalElements,
        totalPages: result.totalPages,
      });
    } catch (err) {
      console.error("getPageList 실패: ", err);
    }
  };

  // 리뷰수정
  const handleEdit = (review) => {
    // 페이지 이동 or 모달 팝업
    navigate("/review/edit", { state: { review } });
  };

  // 리뷰삭제
  const handleDelete = async (reviewId) => {
    if (window.confirm("이 리뷰를 삭제하시겠습니까?")) {
      try {
        await OrderApi.deleteReview(reviewId);
        getPageList(); // 목록 새로고침
      } catch (err) {
        alert("삭제 중 오류 발생");
      }
    }
  };

  // 리뷰 펼침 토글 (글이 긴 경우)
  const toggleOpen = (index) => {
    const newStates = [...openStates];
    newStates[index] = !newStates[index];
    setOpenStates(newStates);
  };

  // 리뷰 목록 가져옴
  useEffect(() => {
    getPageList();
  }, [page]);

  // 리뷰 수 변경시 펼침 여부 배열 초기화
  useEffect(() => {
    setOpenStates(new Array(reviews.length).fill(false));
  }, [reviews]);

  return (
    <MyReviewComp>
      <div className="container">
        {reviews.length === 0 ? (
          <div style={{ padding: "20px", textAlign: "center", color: "#888" }}>
            아직 작성한 리뷰가 없습니다.
          </div>
        ) : (
          reviews.map((review, idx) => (
            <div className="review-card" key={idx}>
              <div className="review-left">
                <div className="review-info">
                  <div className="review-title">{review.title}</div>
                  <div className="review-stars">
                    {"⭐".repeat(review.score)}
                  </div>
                  <div
                    className={`review-content ${
                      openStates[idx] ? "open" : ""
                    }`}
                    onClick={() => toggleOpen(idx)}
                    style={{ cursor: "pointer" }}
                  >
                    {review.content}
                  </div>
                </div>
                <div>
                  {review.imageFile.length === 0 ? (
                    <></>
                  ) : (
                    review.imageFile
                      ?.split(",")
                      .map((img, i) => (
                        <img
                          key={i}
                          src={`${img}`}
                          alt={`이미지 ${i + 1}`}
                          className="product-image"
                          style={{ marginRight: "8px" }}
                        />
                      ))
                  )}
                </div>
              </div>
              <div className="button-box">
                <button onClick={() => handleEdit(review)} className="edit-btn">
                  리뷰수정
                </button>
                <button
                  onClick={() => handleDelete(review.reviewId)}
                  className="delete-btn"
                >
                  리뷰삭제
                </button>
              </div>
            </div>
          ))
        )}

        <PageNumber page={page} setPage={setPage} paging={paging} />
      </div>
    </MyReviewComp>
  );
}

const MyReviewComp = styled.div`
  .container {
    width: 900px;
    margin: 0 auto;
  }

  .review-card {
    display: flex;
    min-height: 100px;
    flex-direction: row;
    align-items: flex-start;
    gap: 16px;
    padding: 16px;
    margin-bottom: 20px;
    border: 1px solid #eee;
    border-radius: 10px;
    background-color: #fffdf7;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }

  .product-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  .review-left {
    width: 600px;
    margin: 0 50px;
  }
  .review-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .review-title {
    font-size: 18px;
    font-weight: bold;
  }

  .review-stars {
    font-size: 16px;
    color: #ffc107;
  }

  /* 리뷰 내용 */
  .review-content {
    font-size: 14px;
    color: #333;
    margin: 10px 0;

    /* 2줄 이상 넘어가면 ... 으로 요약 표시 */
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 보여줄 최대 줄 수 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    transition: all 0.3s ease;
  }

  /* 리뷰 펼쳤을 경우 */
  .review-content.open {
    -webkit-line-clamp: unset;
    display: block;
    overflow: visible;
  }

  .button-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 50px;
  }

  .edit-btn,
  .delete-btn {
    width: 150px;
    height: 45px;
    margin: 5px 0;
    font-size: 1rem;
    font-weight: bold;
    background-color: #f6e96c;
    border: 1px solid #ccc;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .edit-btn:hover,
  .delete-btn:hover {
    background-color: #f1d700;
  }
`;
