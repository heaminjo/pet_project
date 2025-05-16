import { Outlet } from "react-router-dom";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

export default function Layout() {
  //메인 브랜치 체크
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
