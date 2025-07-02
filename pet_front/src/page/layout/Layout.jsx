import { Outlet } from "react-router-dom";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import styled from "styled-components";

export default function Layout() {
  return (
    <LayoutComp>
      <Header />
      <div className="layout_inner">
        <Outlet />
      </div>
      <Footer />
    </LayoutComp>
  );
}
const LayoutComp = styled.div`
  .layout_inner {
    max-width: 1920px;
  }
`;
