import styled from "styled-components";
import UserStatistics from "../../components/admin/UserStatistics";
import { useEffect, useState } from "react";
import AdminApi from "../../api/AdminApi";
const StaticticsComp = styled.div`
  display: flex;
  flex-direction: column;
`;

//종합 통계 페이지
//회원통계,게시판 통계,상품 통계를 관리
export default function StatisticsPage() {
  const [userData, setUserData] = useState([]);

  //로드 시 통계 자료 가져오기
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getStatistics();
  }, []);

  //통계 자료 api 호출
  const getStatistics = async () => {
    const result = await AdminApi.getStatistics();
    console.log(typeof result.userJoin);

    setUserData({
      totalUser: result.totalUser, //총 회원
      todayUser: result.todayUser, //오늘 로그인
      male: result.male, //남자
      female: result.female, //여자
      weekReg: Object.keys(result.userJoin), //최근 7일
      weekJoin: Object.values(result.userJoin),
    });
    console.log(Object.keys(result.userJoin));
    console.log(Object.values(result.userJoin));
  };
  useEffect(() => {
    console.log("weekReg", userData.weekReg);
    console.log("weekJoin", userData.weekJoin);
  }, [userData]);

  return (
    <StaticticsComp>
      <UserStatistics userData={userData} />
    </StaticticsComp>
  );
}
