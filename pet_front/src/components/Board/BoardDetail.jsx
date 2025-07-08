import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BoardDetailStyle from './BoardDetailStyle';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import instance from '../../api/axiosInstance';

import { API_BASE_URL } from '../../services/app-config'
// const KH_DOMAIN = 'http://localhost:8080'; // 개발용
const KH_DOMAIN = `${API_BASE_URL}`; // 배포용

// jwt 토큰에서 로그인한 회원의 ID를 가져옴
function getMemberIdFromToken(token) {
  if (!token) return null;
  try {
    //1. 토큰을 .으로 분리
    const base64Payload = token.split('.')[1];
    //2. base64payload -> base64로 디코딩
    const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
    //3. base64 디코딩 (atob 사용)
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    //4. JSON 파싱
    const payload = JSON.parse(jsonPayload);
    //5. member_id 반환
    return payload.member_id || payload.sub || null;
  } catch (e) {
    return null;
  }
}

export default function BoardDetail() {
  const { category, board_id } = useParams(); // URL 파라미터에서 게시글 ID 추출
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    instance
      .get(`/board/boardDetail/${category}/${board_id}`)
      .then((response) => setPost(response.data))
      .catch((error) => setError(error));
  }, [category, board_id]);

  // 댓글 목록 조회
  useEffect(() => {
    instance
      .get(`/board/${board_id}/comments`)
      .then((response) => setComments(response.data || []))
      .catch((error) => console.error('댓글 불러오기 실패:', error));
  }, [board_id]);

  // 댓글 등록 함수
  const handleAddComment = async () => {
    if (!comment.trim()) return; // 빈 댓글은 추가하지 않음
    try {
      await instance.post(`/board/${board_id}/comments`, { content: comment, member_id: loginMemberId, board_id: board_id });
      setComment(''); // 댓글 입력란 초기화
      // 댓글 등록 후 다시 댓글 목록 조회
      const res = await instance.get(`/board/${board_id}/comments`);
      setComments(res.data || []);
    } catch (error) {
      alert('댓글 등록에 실패했습니다.');
    }
  };

  // 댓글 삭제 함수
  const handleDeleteComment = async (comment_id) => {
    if (!window.confirm('정말 댓글을 삭제하시겠습니까?')) return;
    try {
      await instance.delete(`/board/${board_id}/comments/${comment_id}`);
      // 댓글 삭제 후 다시 댓글 목록 조회
      const res = await instance.get(`/board/${board_id}/comments`);
      setComments(res.data || []);
    } catch (error) {
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  // 댓글 수정 시작 함수
  const handleEditStart = (comment) => {
    setEditingCommentId(comment.comment_id);
    setEditingContent(comment.content);
  };

  // 댓글 수정 취소 함수
  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  // 댓글 수정 완료 함수
  const handleEditSubmit = async (comment_id) => {
    if (!editingContent.trim()) return; // 빈 댓글은 수정하지 않음
    try {
      await instance.put(`/board/${board_id}/comments/${comment_id}`, { content: editingContent });
      setEditingCommentId(null);
      setEditingContent('');
      // 댓글 수정 후 다시 댓글 목록 조회
      const res = await instance.get(`/board/${board_id}/comments`);
      setComments(res.data || []);
    } catch (error) {
      alert('댓글 수정에 실패했습니다.');
    }
  };

  if (error) {
    return <div>게시글을 불러오지 못했습니다. {error.message}</div>;
  }

  if (!post) {
    return <div>로딩 중...</div>;
  }

  const token = sessionStorage.getItem('accessToken');
  const loginMemberId = getMemberIdFromToken(token); // JWT 토큰에서 로그인한 회원의 ID를 가져옴
  //const loginRole = sessionStorage.getItem("role"); // "ADMIN" 또는 "USER"

  // 작성자(member_id) 또는 관리자(ADMIN)만 버튼 보이게
  const canEditOrDelete = String(post.member_id) === String(loginMemberId) || sessionStorage.getItem('role') === 'ROLE_ADMIN';

  console.log('board_Id:', board_id);

  // 삭제 기능
  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await instance.delete(`/board/delete/${post.board_id}`);
        alert('삭제되었습니다.');
        navigate(`/boardList/${category}`);
      } catch (err) {
        alert('삭제에 실패했습니다.');
      }
    }
  };

  // 수정 기능 (수정 폼으로 이동)
  const handleEdit = () => {
    navigate(`/boardEditForm/${category}/${post.board_id}`, {
      state: { category: post.category || 'board' },
    });
  };

  console.log('loginMemberId:', loginMemberId, 'post.member_id:', post.member_id);

  return (
    <BoardDetailStyle>
      <div
        style={{
          width: '50%',
          height: '80%',
          margin: '40px auto',
          fontFamily: 'GmarketSansMedium',
        }}
        className='boardDetailContainer'>
        <h2>{post.title}</h2>
        <div style={{ color: '#888', marginBottom: '10px' }}>
          작성자: {post.name} | 조회수: {post.views} | 작성일: {post.reg_date}
        </div>
        <div style={{ minHeight: '100px', fontSize: '18px', marginTop: '20px', marginBottom: '20px' }}>{post.content}</div>
        <div className='image-gallery' style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {post?.fileList && post.fileList.filter((f) => f.file_type && f.file_type.startsWith('image/')).map((file, idx) => <img key={file.file_name} src={`${KH_DOMAIN}/resources/webapp/userImages/${file.file_name}`} alt={file.origin_name} style={{ width: '200px', height: 'auto', borderRadius: '8px', objectFit: 'cover' }} />)}
        </div>
        {canEditOrDelete && (
          <div style={{ marginTop: '30px', textAlign: 'right' }}>
            <button onClick={handleEdit} style={{ marginRight: '10px' }}>
              수정
            </button>
            <button onClick={handleDelete}>삭제</button>
          </div>
        )}
        <hr style={{ marginBottom: '100px', marginTop: '5px' }}></hr>
        <h3>댓글쓰기</h3>
        <br></br>
        <CommentForm comment={comment} setComment={setComment} onAddComment={handleAddComment} />
        <br></br>
        <br></br>
        <h3>댓글 ({comments.length})</h3>
        <br></br>
        <CommentList comments={comments} onDeleteComment={handleDeleteComment} editingCommentId={editingCommentId} editingContent={editingContent} setEditingContent={setEditingContent} handleEditStart={handleEditStart} handleEditCancel={handleEditCancel} handleEditSubmit={handleEditSubmit} loginMemberId={loginMemberId} />
      </div>
    </BoardDetailStyle>
  );
}
