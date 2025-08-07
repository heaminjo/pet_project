import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GoodsApi from '../../api/GoodsApi';

export default function StickyBanner() {
  const [stickyBanner, setStickyBanner] = useState([]);

  // 광고 상품 가져오기
  const getStickyBanner = async () => {
    try {
      const result = await GoodsApi.getStickyBanner();
      console.log('광고 응답 데이터:', result.data);
      setStickyBanner(result);
    } catch (e) {
      console.error(`Failed to load StickyBanner section`, e);
    }
  };

  useEffect(() => {
    console.log(`[StickyBanner] 데이터 요청`);
    getStickyBanner();
    console.log(stickyBanner?.length);
  }, []);

  return (
    <StickyWrapper>
      <a href='#'>
        <img src='/images/banner1.png' alt='광고1' />
      </a>
      <a href='#'>
        <img src='/images/banner2.png' alt='광고2' />
      </a>
      <a href='#'>
        <img src='/images/banner3.png' alt='광고3' />
      </a>
    </StickyWrapper>
  );
}

const StickyWrapper = styled.div`
  position: fixed;
  top: 300px;
  right: 200px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  z-index: 100;

  a img {
    width: 120px;
    height: 500px;
    border: 1px solid #ddd;
    border-radius: 10px;
  }

  @media (max-width: 1024px) {
    display: none; /* 모바일/태블릿에서는 숨김 */
  }
`;
