import { useEffect } from 'react';
import Banner from '../../components/main/Banner';
import styled from 'styled-components';
import Best from '../../components/main/Best';
import Advertise from '../../components/main/Advertise';

export default function Main() {
  const sections = [
    { type: 'best', title: '오늘의 베스트 상품', description: '평점 BEST! TOP 12' },
    { type: 'sale', title: '특가 상품', description: '평점 BEST ! 조회수 BEST! TOP 12' },
    { type: 'recent', title: '신규 상품', description: '새롭게 등록되었어요! 가장 최근에 등록된 신상품 TOP 12' },
    // 최근 추가된 상품, 카테고리별 판매량 BEST
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <MainComp>
      <div className='main_inner'>
        <Banner />
        <Best />
        {sections.map((s) => (
          <Advertise key={s.type} type={s.type} title={s.title} description={s.description} />
        ))}
      </div>
    </MainComp>
  );
}
const MainComp = styled.div`
  width: 100%;
  .main_inner {
    width: 100%;
    max-width: 1920px;
    margin-top: 150px;
    padding: 0;
    display: flex;
    flex-direction: column;
    padding-bottom: 30px;
    /* background-color: rgb(255, 254, 242); */
  }
`;
