import { useEffect } from "react";
import MainComp from "./MainStyle";
import Banner from "../../components/main/Banner";

export default function Main() {
  return (
    <MainComp>
      <div className="mainInner">
        <Banner />
      </div>
    </MainComp>
  );
}
