import React from "react"; 
import CommentListStyle from "./CommentListStyle";

function CommentList({ comments, onDeleteComment, editingCommentId, editingContent, setEditingContent, handleEditStart, handleEditCancel, handleEditSubmit, loginMemberId }) {

  const isAdmin = sessionStorage.getItem("role") === "ROLE_ADMIN";


  return (
    <CommentListStyle>
      <ul className="comment-list">
        {comments.length === 0 ? (
          <li style={{ color: "#888", textAlign: "center", padding: "20px 0" }}>
          아직 댓글이 없습니다.
          </li>
          ) : (
          comments.map((c) => (
            <li key={c.comment_id}>
              <strong>{c.name}</strong><br></br>
              &nbsp;&nbsp;
              {editingCommentId === c.comment_id ? (
                <div className="editRow"> 
                  <input
                    type="text"
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter") handleEditSubmit(c.comment_id);
                      if (e.key === "Escape") handleEditCancel();
                    }}
                    style={{ marginLeft: "5px" }}
                  />
                  <button onClick={() => handleEditSubmit(c.comment_id)}>저장</button>
                  <button onClick={handleEditCancel} style={{ marginLeft: "3px" }}>취소</button>
                  {/* 본인 또는 관리자만 삭제 버튼 표시 */}
                  {(String(c.member_id) === String(loginMemberId) || isAdmin) && (
                    <button 
                      style={{ marginLeft: "3px" }}
                      onClick={() => onDeleteComment(c.comment_id)}>
                      삭제
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <span style={{ marginLeft: "5px" }}>{c.content}</span>&nbsp;&nbsp;
                  <div className="meta-row">
                    <span className="regdate">{c.reg_date}</span>
                    {/* 본인 댓글만 수정 버튼 표시 */}
                    {(String(c.member_id) === String(loginMemberId) || isAdmin) ? (
                      <div className="button-group">
                        <button onClick={() => handleEditStart(c)}>수정</button>
                        <button onClick={() => onDeleteComment(c.comment_id)}>삭제</button>
                      </div>
                    ) : (
                      <div className="button-group">
                        <button style={{ visibility: "hidden" }}>수정</button>
                        <button style={{ visibility: "hidden" }}>삭제</button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </CommentListStyle>  
  );
}

export default CommentList;