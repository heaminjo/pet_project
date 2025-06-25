import { Outlet } from "react-router-dom";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <div style={{ maxWidth: "1920px" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
