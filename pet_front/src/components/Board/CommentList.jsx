import React from "react"; 

function CommentList({ comments, onDeleteComment, editingCommentId, editingContent, setEditingContent, handleEditStart, handleEditCancel, handleEditSubmit, loginMemberId }) {

  return (
    <ul>
      {comments.map((c) => (
        <li key={c.comment_id}>
          <strong>{c.member_id}</strong>:
          {editingCommentId === c.comment_id ? (
            <>
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
              <button onClick={handleEditCancel}>취소</button>
            </>
          ) : (
            <>
              <span style={{ marginLeft: "5px" }}>{c.content}</span>
              {/* 본인 댓글만 수정 버튼 표시 */}
              {String(c.member_id) === String(loginMemberId) && (
                <button style={{ marginLeft: "10px" }} onClick={() => handleEditStart(c)}>
                  수정
                </button>
              )}
            </>
          )}
          <button 
            style={{ marginLeft: "10px" }}
            onClick={() => onDeleteComment(c.comment_id)}  
          >삭제
          </button>
        </li>
      ))}
    </ul>
  );

}

export default CommentList;