import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GoodsApi from '../../../api/GoodsApi';
import OrderApi from '../../../api/OrderApi';
import PageNumber from '../../util/PageNumber';
import { useLocation, useNavigate } from 'react-router-dom';

const MyReviewComp = styled.div`
  .container {
    width: 900px;
  }
`;

// 리뷰 페이지
export default function MyReview() {
  const navigate = useNavigate();
  const location = useLocation();
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상 태 변 수 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const { goods } = location.state || {};
  const [reviews, setReviews] = useState([]);

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
      console.error('getPageList 실패: ', err);
    }
  };

  useEffect(() => {
    getPageList();
  }, [page]);

  return (
    <MyReviewComp>
      <div className='container'>
        <h2>내가 작성한 리뷰 목록</h2>
      </div>
    </MyReviewComp>
  );
}
