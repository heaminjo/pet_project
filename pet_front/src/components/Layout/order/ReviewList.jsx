import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import GoodsApi from '../../../api/GoodsApi';
import PageNumber from '../../util/PageNumber';

const ReviewListComp = styled.div`
  .container {
    width: 100%;
    .reviews {
      width: 100%;
      height: 600px;
      border: 1px solid #ddd;
      .review {
        margin: 10px auto;
        border: 1px solid #ddd;
        .prodimg {
          width: 100px;
          height: 100px;
          margin: 10px auto;
          border: 1px solid #ddd;
        }
      }
    }
  }
`;

// 리뷰 페이지
export default function ReviewList({ stars, goodsId, reviewNum, imgUrl }) {
  useEffect(() => {
    console.log('props로 전달된 goodsId:', goodsId);
  }, [goodsId]);

  const [reviews, setReviews] = useState([]); // 유저 리뷰
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
    <ReviewListComp>
      <div className='container'>
        <div>동일한 상품에 대한 상품평으로, 판매자는 다를 수 있습니다.</div>
        <div className='rating' style={{ color: 'red', fontSize: '24px' }}>
          {stars}&nbsp;&nbsp;{'( ' + reviewNum + ' )'}
        </div>
        <br />
        <hr />
        <div className='reviews'>
          {reviews.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>아직 작성된 리뷰가 없습니다.</div>
          ) : (
            reviews.map((item, index) => (
              <div className='review' key={index}>
                <div>{getStars(item.score)}</div>
                <img src={`${imgUrl}${item.imageFile}`} alt={item.goodsName} className='prodimg' />

                <div>{item.title}</div>
                <div>{item.content}</div>
              </div>
            ))
          )}
        </div>
        <PageNumber page={page} setPage={setPage} paging={paging} />
      </div>
    </ReviewListComp>
  );
}
