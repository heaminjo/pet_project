import BoardInsertFormStyle from "./BoardInsertFormStyle";

export default function BoardInsertForm() {
  return (
    <BoardInsertFormStyle>
      <div className="boardInsertFormContainer">
        <h2>게시글 작성</h2>
        <form>
          <table>
            <tr>
              <td><label htmlFor="title">제목</label></td>
            </tr>  
            <tr>
              <td><input type="text" id="title" name="title" /></td>
            </tr>
            <tr>
              <td>
              
              <label htmlFor="content">내용</label>
              </td>
            </tr>
            <tr>
              <textarea id="content" name="content"></textarea>
            </tr>
            <tr>
              <button type="submit">작성하기</button>
            </tr>
          </table>
        </form>
      </div>
    </BoardInsertFormStyle>
  );
}