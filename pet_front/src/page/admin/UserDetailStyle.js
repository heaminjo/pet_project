import styled from "styled-components";

const UserDetailComp = styled.div`
  width: 100%;
  margin-top: 150px;
  .detail_inner {
    width: 80%;
    margin: 0 auto;
    display: flex;
    padding: 40px 0;
    gap: 40px;
    .detail_container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
`;
export default UserDetailComp;
