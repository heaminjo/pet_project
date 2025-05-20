import { Outlet } from "react-router-dom";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

export default function Layout() {
  //ddd
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
