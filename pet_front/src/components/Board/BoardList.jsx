import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


export default function BoardList({ isLogin }) {
  const [listData, setListData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/board/boardList")
      .then(response => setListData(response.data))
      .catch(error => setError(error));
  }, []);

  if (error) {
    return <div>게시판을 불러오지 못했습니다. =&gt; {error.message}</div>;
  }

  return (
    <table style={{ width: "60%", margin: "0 auto" }}>
      <thead>
        <tr><td colSpan={5} height={30}>게시판</td></tr>
        <tr style={{ background: "gray" }}>
          <th>NO</th><th>제목</th><th>작성자</th><th>조회수</th><th>작성일</th>
        </tr>
      </thead>
      <tbody>
        {listData.map(b => (
          <tr key={b.board_id}>
            <td>{b.board_id}</td>
            <td>{b.title}</td>
            <td>{b.name}</td>
            <td>{b.views}</td>
            <td>{b.reg_date}</td>
          </tr>
        ))}
        <tr>
          <td colSpan={5} align="right">
            <Link to="/boardInsertForm">
              <button type="button" style={{ width: 80, height: 30, fontSize: 18 }}>글쓰기</button>
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
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