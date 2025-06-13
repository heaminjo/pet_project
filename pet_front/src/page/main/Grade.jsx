import styled from "styled-components";

//등급 안내 페이지
export default function Grade() {
  return (
    <GradeComp>
      <div className="grade_inner">
        <div className="grade_container">
          <div className="grade_intro">
            <div className="intro_text">
              <h2>몽냥마켓 회원 등급 안내</h2>
              <p>
                우리 몽이, 냥이에게 더 많은 혜택을! 회원 등급에 따라 달라지는
                특별한 혜택을 확인해보세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </GradeComp>
  );
}
const GradeComp = styled.div`
  margin-top: 150px;
  .grade_inner {
    width: 1220px;
    margin: 0 auto;
    .grade_container {
      padding: 50px 0;
    }
  }
`;
