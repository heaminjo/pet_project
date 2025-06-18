import React from "react";
import CommentFormStyle from "./CommentFormStyle";

function CommentForm({ comment, setComment, onAddComment}) {
  
  // 폼 제출 시 onAddComment 함수를 호출하여 댓글 추가
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return; // 빈 댓글은 추가하지 않음
    onAddComment();
    setComment(""); // 댓글 입력란 초기화
  };

  return (
    <CommentFormStyle>
      <div className="comment-form-container">
        <form onSubmit={handleSubmit} className="comment-form">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={e => {if (e.key === "Enter") onAddComment(); }}
            placeholder="댓글을 입력하세요"
            maxLength={ 200 }>
          </input>
          <button type="submit">등록</button>
        </form>
      </div>
    </CommentFormStyle>
  )




}

export default CommentForm;