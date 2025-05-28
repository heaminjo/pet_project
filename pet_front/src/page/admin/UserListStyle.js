import styled from "styled-components";

const UserListComp = styled.div`
  width: 100%;
  margin-top: 150px;
  .list_inner {
    width: 80%;
    margin: 0 auto;
    display: flex;
    padding: 40px 0;
    gap: 40px;
    .list_container {
      width: 100%;
      border: 1px solid #000;
      padding: 20px;
      border: 1px solid #eee;
      box-shadow: 3px 3px 3px #ccc;
    }
  }
`;
export default UserListComp;
