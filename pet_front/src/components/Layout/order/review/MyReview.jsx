import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderApi from '../../../../api/OrderApi';
import PageNumber from '../../../util/PageNumber';
import GoodsApi from '../../../../api/GoodsApi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Modal from '../../../../modal/Modal';

// 리뷰 페이지
export default function MyReview() {
  const navigate = useNavigate();
  const location = useLocation();
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상 태 변 수 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const { goods } = location.state || {};
  const [reviews, setReviews] = useState([]);
  const [targetReviewId, setTargetReviewId] = useState(null);

  const [openStates, setOpenStates] = useState([]); // 각 리뷰들의 펼침 상태

  const [stars, setStars] = useState(); // ⭐
  const [goodsId, setGoodsId] = useState('');

  // 모달
  const [showModal, setShowModal] = useState(false); // Y/N

  // 페이징 관련 상태변수
  const [type, setType] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('desc');
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

  // 별점 (배열)
  const renderStars = (rating) => {
    // return '⭐'.repeat(Math.floor(rating)); // 반올림이나 소수점 무시
    const stars = [];
    const fullStars = Math.floor(rating); // 채운 별 수
    const emptyStars = 5 - fullStars; // 빈 별 수
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} color='gold' size={20} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} color='lightgray' size={20} />);
    }
    return stars;
  };

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
      console.log(`${result}`);
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
      console.error('getPageList 실패: ', err);
    }
  };

  // goodsId 로 상품정보 불러오기
  const getGoodsInfo = async (goodsId) => {
    try {
      const result = await GoodsApi.goodsDetail(goodsId);
      console.log(`${result}`);
    } catch (e) {
      console.error(e);
    }
  };

  // 리뷰수정
  const handleEdit = (review) => {
    // 페이지 이동 or 모달 팝업
    navigate('/review/edit', { state: { review } });
  };

  // 리뷰삭제 시 모달 오픈
  const modalOpen = (reviewId) => {
    setTargetReviewId(reviewId);
    setShowModal(true);
  };

  // 리뷰삭제
  const handleDelete = async () => {
    // if (window.confirm('이 리뷰를 삭제하시겠습니까?')) {
    if (showModal) {
      try {
        const result = await OrderApi.deleteReview(targetReviewId);
        console.log(`OrderApi.deleteReview(reviewId) 결과 ${result}`);
        getPageList(); // 목록 새로고침
        setShowModal(false);
        setTargetReviewId(null);
      } catch (err) {
        alert('삭제 중 오류 발생');
        setShowModal(false);
        setTargetReviewId(null);
      }
    } else return;
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
      <div className='container'>
        <h2>내 리뷰</h2>
        {reviews.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>아직 작성한 리뷰가 없습니다.</div>
        ) : (
          reviews.map((review, idx) => (
            <div className='review-card' key={idx}>
              <div className='review-left'>
                <div className='review-box'>
                  <div className='prod-info'>
                    <img src={review.goods.imageFile} alt={review.goods.goodsName} className='product-image' style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                    <span>{review.goods.goodsName}</span>
                    <div>{renderStars(review.goods.rating)}</div>
                  </div>
                  <div className='review-info'>
                    <div className='review-date'>
                      <h3>
                        {review.regDate}
                      </h3>
                    </div>
                    <div className='review-title'>{review.title}</div>
                    <div className='review-stars'>{renderStars(review.score)}</div>
                    <div className={`review-content ${openStates[idx] ? 'open' : ''}`} onClick={() => toggleOpen(idx)} style={{ cursor: 'pointer' }}>
                      {review.content}
                    </div>
                    <div>
                      {review.imageFile.length === 0 || !review.imageFile ? (
                        <>
                          <span style={{ color: 'gray' }}>이미지 없음</span>
                        </>
                      ) : (
                        review.imageFile && review.imageFile.split(',').map((img, i) => <img key={i} src={`${img.trim()}`} alt={`이미지 ${i + 1}`} className='product-image' style={{ marginRight: '8px' }} />)
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='button-box'>
                <button onClick={() => handleEdit(review)} className='edit-btn'>
                  리뷰수정
                </button>
                <button onClick={() => modalOpen(review.reviewId)} className='delete-btn'>
                  리뷰삭제
                </button>
              </div>
            </div>
          ))
        )}
        <PageNumber page={page} setPage={setPage} paging={paging} />
      </div>
      {showModal && (
        <ModalContainer>
          <Modal
            content={<>리뷰를 삭제하시겠습니까?</>}
            clickEvt={handleDelete}
            cancelEvt={() => {
              setShowModal(false);
              setTargetReviewId(null);
            }}
            setModal={setShowModal}
          />
        </ModalContainer>
      )}
    </MyReviewComp>
  );
}

const ModalContainer = styled.div`
  background-color: rgb(233, 232, 232);
  position: fixed;
  top: 30%;
  left: 40%;
  transform: translate(-50%, -50%);
`;

const MyReviewComp = styled.div`
  .container {
    width: 900px;
    margin: 0 auto;
    color: #444;
  }

  .review-card {
    display: flex;
    min-height: 100px;
    flex-direction: row;
    align-items: flex-start;
    gap: 16px;
    padding: 16px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  }
  .review-card:hover {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  .product-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #ccc;
    cursor: pointer;
    transition: transform 0.3s ease; /* 부드러운 애니메이션 */
    box-shadow: 1px 1px 3px rgb(150, 150, 150);
  }

  .product-image:hover {
    transform: scale(1.05);
  }
  .review-left {
    width: 600px;
    margin: 20px;
  }
  .review-box {
    flex: 1;
    display: flex;
    flex-direction: row;
    gap: 50px;
    .prod-info {
      width: 150px;
      height: 200px;
      border: 1px solid #ccc;
      padding: 10px;
      gap: 10px;
      align-items: center;
      border-radius: 3px;
      box-shadow: 3px 3px 6px rgb(194, 194, 194);
      display: flex;
      flex-direction: column;
      img {
        width: 100px;
        margin-top: 10px;
      }
    }
    .review-info {
      width: 400px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
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
    width: 200px;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 50px;
  }

  .edit-btn,
  .delete-btn {
    width: 150px;
    height: 45px;
    margin: 20px 0;
    font-size: 1rem;
    font-weight: bold;
    background-color: #ffaaaa;
    border: 1px solid #ccc;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .edit-btn:hover,
  .delete-btn:hover {
    background-color: rgb(255, 145, 145);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;
