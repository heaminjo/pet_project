import { useEffect } from 'react';
import Banner from '../../components/main/Banner';
import styled from 'styled-components';
import Best from '../../components/main/Best';

export default function Main() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <MainComp>
      <div className='main_inner'>
        <Banner />
        <Best />
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
