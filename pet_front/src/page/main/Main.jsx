import { useEffect } from "react";
import Banner from "../../components/main/Banner";
import styled from "styled-components";
import Best from "../../components/main/Best";

export default function Main() {
  return (
    <MainComp>
      <div className="main_inner">
        <Banner />
        <Best />
      </div>
    </MainComp>
  );
}
const MainComp = styled.div`
  .main_inner {
    margin-top: 150px;
    padding: 100px 0;
    display: flex;
    flex-direction: column;
    gap: 100px;
    /* background-color: rgb(255, 254, 242); */
  }
`;
