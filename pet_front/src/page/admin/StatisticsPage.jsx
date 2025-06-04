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
    getStatistics();
  }, []);

  //통계 자료 api 호출
  const getStatistics = async () => {
    const result = await AdminApi.getStatistics();
    setUserData({ totalUser: result.totalUser, todayUser: result.todayUser });
  };
  return (
    <StaticticsComp>
      <UserStatistics userData={userData} />
    </StaticticsComp>
  );
}
