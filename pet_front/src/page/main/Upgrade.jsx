import { useLocation } from "react-router-dom";
import styled from "styled-components";

export default function Upgrade() {
  const location = useLocation();

  return (
    <UpgradeComp>
      <h1>{location.state?.nextGrade} 로 업그레이드 돼었습니다!</h1>
    </UpgradeComp>
  );
}
const UpgradeComp = styled.div`
  margin-top: 150px;
  height: calc(100vh - 150px);
`;
