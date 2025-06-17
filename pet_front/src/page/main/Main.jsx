import { useEffect } from "react";
import Banner from "../../components/main/Banner";
import styled from "styled-components";

export default function Main() {
  return (
    <MainComp>
      <div className="main_inner">
        <Banner />
      </div>
    </MainComp>
  );
}
const MainComp = styled.div`
  .main_inner {
    margin-top: 170px;
    padding: 50px 0;
  }
`;
