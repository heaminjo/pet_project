import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GoodsApi from '../../../api/GoodsApi';
import PageNumber from '../../util/PageNumber.jsx';
import React, { useState } from 'react';
import styled from 'styled-components';

const SearchListComp = styled.div`
  .container {
  }
`;

export default function SearchList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [goods, setGoods] = useState([]);


  
  // 페이징
  const getPageList = async () => {
    const pages = {
      page: page,
      size: 8,
      sortBy: sort,
      keyword: keyword,
      type: type,
    };
    try {
      const result = await GoodsApi.getGoodsPageList(pages);
      // 1. 상품 목록
      setGoods(result.content);

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

  // 페이징
  useEffect(() => {
    getPageList();
  }, [page]);

  return (
    <SearchListComp>
      <div className='container'></div>
    </SearchListComp>
  );
}
