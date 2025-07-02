import { Outlet } from "react-router-dom";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import styled from "styled-components";

export default function Layout() {
  return (
    <LayoutComp>
      <div className="layout_inner">
        <Header />

        <Outlet />

        <Footer />
      </div>
    </LayoutComp>
  );
}
const LayoutComp = styled.div`
  .layout_inner {
    /* width: 100%; */
    max-width: 1920px;
  }
`;
