import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GoodsApi from '../../../../api/GoodsApi';
import PageNumber from '../../../util/PageNumber';

// 리뷰 페이지
export default function ReviewList({ stars, goodsId, reviewNum }) {
  useEffect(() => {
    console.log('props로 전달된 goodsId:', goodsId);
  }, [goodsId]);

  const [reviews, setReviews] = useState([]); // 유저 리뷰 리스트
  const [userStar, setUserStar] = useState(); // ⭐ 유저 별점

  const [sort, setSort] = useState('desc');
  const [page, setPage] = useState(0); // 1 페이지, 2 페이지, ...

  //const searchType = params.get("searchType") || "title";
  //const searchKeyword = params.get("searchKeyword") || "";
  const [type, setType] = useState('all');
  const [keyword, setKeyword] = useState('');

  // 페이징 정보 상태변수 (현재 페이징 상태 핸들링 위함)
  const [paging, setPaging] = useState({
    start: 0,
    end: 4,
    isPrev: false,
    isNext: true,
    totalElement: 0,
    totalPages: 0,
  });

  // (페이징) : 해당 상품을 구매한 모든 유저 - ReviewResponseDTO
  const getPageList = async (goodsId) => {
    if (!goodsId) {
      console.error('goodsId가 유효하지 않습니다.');
      return;
    }
    const pages = {
      page: page,
      size: 3,
      sortBy: sort,
      keyword: keyword,
      type: type,
    };
    try {
      const result = await GoodsApi.getReviewsPageList(pages, goodsId);
      // 1. 리뷰 목록
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
      console.error('getReviewsPageList 실패: ', err);
    }
  };

  // 유저가 매긴 별점
  const getStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating)); // 반올림이나 소수점 무시
  };

  useEffect(() => {
    if (goodsId) getPageList(goodsId);
  }, [page, goodsId]);

  return (
    <ReviewListComp className={reviews.length === 0 ? 'no-review' : ''}>
      <div className='container'>
        <div className='reviews'>
          {reviews.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#888', marginTop: '70px' }}>아직 작성된 리뷰가 없습니다.</div>
          ) : (
            reviews.map((item, index) => (
              <div className='review' key={index}>
                <div className='header'>
                  <span className='name'>{item.userName || '작성자'}</span>
                  <span className='date'>{item.createdDate || '날짜없음'}</span>
                </div>
                <div className='body'>
                  <div>{getStars(item.score)}</div>
                  <div className='images'>
                    {item.imageFiles?.map((img, i) => (
                      <img key={i} src={`${img}`} alt={`review-img-${i}`} />
                    ))}
                  </div>
                  <div>{item.title}</div>
                  <div>{item.content}</div>
                </div>
              </div>
            ))
          )}
        </div>
        <PageNumber page={page} setPage={setPage} paging={paging} />
      </div>
    </ReviewListComp>
  );
}
const ReviewListComp = styled.div`
  .container {
    padding: 0;
    margin: 0;

    .reviews {
      display: flex;
      flex-direction: column;
      gap: 0;
      padding: 0;
      margin: 0;
    }

    .review {
      padding: 16px 0;
      margin: 0;
      border-bottom: 1px solid #ddd;
      font-size: 14px;
      color: #333;

      .header {
        display: flex;
        flex-direction: column;
        margin-bottom: 4px;

        .name {
          font-weight: bold;
          font-size: 15px;
        }

        .date {
          font-size: 12px;
          color: #999;
        }
      }

      .body {
        display: flex;
        flex-direction: column;
        gap: 6px;

        .stars {
          font-size: 14px;
          color: gold;
        }

        .images {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 6px;

          img {
            width: 100px;
            height: 100px;
            object-fit: cover;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
        }

        .title {
          font-weight: bold;
          font-size: 14px;
          margin: 4px 0;
        }

        .content {
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
        }
      }
    }
  }
`;
