import { useNavigate } from 'react-router-dom';
import MemberApi from '../../api/MemberApi';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

//관리자 사이드 메뉴 컴포넌트
export default function AdminMenu() {
  const AdminMenuComp = styled.div`
    .side_menu {
      width: 200px;
      padding: 15px 10px;
      background-color: rgb(255, 251, 195);
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-shadow: 3px 3px 3px #ccc;
      .sub_menu {
        background-color: #fff;
        .menu_title {
          background-color: #f8e776;
          font-size: 17px;
          font-weight: bold;
          padding: 5px;
          color: rgb(86, 82, 57);
        }
        ul {
          padding: 10px;
          li {
            span {
              font-size: 14px;
              cursor: pointer;
            }
          }
        }
      }
    }
  `;
  const navigate = useNavigate();
  return (
    <AdminMenuComp>
      <div className='side_menu'>
        <div className='sub_menu' id='user_menu'>
          <p className='menu_title'>회원 관리</p>
          <ul>
            <li>
              <span onClick={() => navigate('/admin/page/userlist')}>회원 목록 및 상세 정보</span>
            </li>
            <li>
              <span onClick={() => navigate('/admin/page/grade')}>회원 등급 관리</span>
            </li>
            <li>
              <span>회원 상태 관리</span>
            </li>
            <li>
              <span>고객 활동 기록</span>
            </li>
          </ul>
        </div>
        <div className='sub_menu' id='goods_menu'>
          <p className='menu_title'>상품 관리</p>
          <ul>
            <li>
              <span onClick={() => navigate('/admin/page/goods/modify')} style={{ color: 'red', fontWeight: 'bold' }}>
                상품 등록/수정/삭제
              </span>
            </li>
            <li>
              <span onClick={() => navigate('/admin/page/category')}>상품 카테고리 관리</span>
            </li>
            <li>
              <span onClick={() => navigate('/admin/page/inventory')}>상품 재고 관리</span>
            </li>
            <li>
              <span onClick={() => navigate('/admin/page/goods/state')}>상품 상태 관리</span>
            </li>
          </ul>
        </div>
        <div className='sub_menu' id='order_menu'>
          <p className='menu_title'>주문 관리</p>
          <ul>
            <li>
              <span onClick={() => navigate('/admin/page/orderlist')} style={{ color: 'red', fontWeight: 'bold' }}>
                전체 주문 목록
              </span>
            </li>
            <li>
              <span onClick={() => navigate('/admin/page/delivery')} style={{ color: 'red', fontWeight: 'bold' }}>
                주문 상세 및 상태 변경
              </span>
            </li>
            <li>
              <span style={{ color: 'red', fontWeight: 'bold' }}>반품 처리</span>
            </li>
          </ul>
        </div>
        <div className='sub_menu' id='border_menu'>
          <p className='menu_title'>메인 관리</p>
          <ul>
            <li>
              <span onClick={() => navigate('/admin/page/banner')}>메인 배너 관리</span>
            </li>
            <li>
              <span onClick={() => navigate('/admin/page/best')}>베스트 상품 관리</span>
            </li>
          </ul>
        </div>
      </div>
    </AdminMenuComp>
  );
}
