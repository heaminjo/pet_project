import React, { useEffect, useState } from "react";
import axios from "axios";
import BoardListStyle from "./BoardListStyle";
import { useNavigate } from "react-router-dom";

export default function BoardList({ isLogin }) {  // 나중에 login 여부에 따라 글쓰기 버튼을 보여줄지 말지 결정할 수 있음
  const [listData, setListData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/board/boardList")
      .then(response => setListData(response.data))
      .catch(error => setError(error));
  }, []);

  if (error) {
    // 서버 에러 코드에 따라 메시지 분기
    if (error.response && error.response.status === 502) {
      return <div>{error.response.data}</div>;
    }
    return <div>게시판을 불러오지 못했습니다. =&gt; {error.message}</div>;
  }

  return (
    <BoardListStyle>
      <div className="boardListContainer">
        <table>                                 
          <thead>
            <tr>
              <td colSpan={5} height={50}>게시판</td>
            </tr>
            <tr style={{ backgroundColor: " #f8e776" }}>
              <th>NO</th>
              <th>제목</th>
              <th>작성자</th>
              <th>조회수</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {listData.map((b) => (
              <tr key={b.board_id}>
                <td className="center">{b.board_id}</td>
                <td className="center">{b.title}</td>
                <td className="center">{b.name}</td>
                <td className="center">{b.views}</td>
                <td className="center">{b.reg_date}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={5} align="right">
                <button 
                  type="button"
                  onClick={() => navigate("/boardInsertForm")} // 글쓰기 이동 기능 추가 가능
                >
                  글쓰기
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </BoardListStyle>
  );
}



// 자유게시판 ajax 함수
// export default function boardList(isLogin){

   

//     let url="/board/boardList"; 
//     axios.get(url
//     ).then(response=>{
//         let listData=response.data;
//         let resultHtml=
//         `<table style="width:60%; margin-left: auto; margin-right: auto;">
//         <tr><td colspan=5 height=30 >게시판</td></tr>
// 		<tr bgcolor="Gray" >
// 			<th>NO</th><th>제목</th><th>작성자</th><th>조회수</th><th>작성일</th>
// 	  	</tr>`
//         for(let b of listData){
//             resultHtml+=
//             `<tr><td>${b.board_id}</td><td>${b.title}</td><td>${b.name}</td>
// 				<td>${b.views}</td><td>${b.reg_date}</td></tr>`
//         }
//         resultHtml+=`<tr><td colspan=5 align="right">
//                      <button type="button" style="width: 80px; height: 30px; font-size: 18px;">글쓰기</button>
//                      </td></tr></table>`;
//         document.getElementById("mainArea").innerHTML=resultHtml;
//     }).catch(error=>{
//         if(error.response.status===502){
//             document.getElementById("mainArea").innerHTML=error.response.data;
//         }else{
//             document.getElementById("mainArea").innerHTML
//             =`게시판을 불러오지 못했습니다. => ${error.message}`;
//         }
//     });    
// }