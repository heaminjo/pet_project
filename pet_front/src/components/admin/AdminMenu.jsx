import { useNavigate } from 'react-router-dom';
import MemberApi from '../../api/MemberApi';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

//관리자 사이드 메뉴 컴포넌트
export default function AdminMenu() {
  const AdminMenuComp = styled.div`
    .side_menu {
      width: 250px;
      padding: 50px 10px;
      background-color: rgb(255, 255, 255);
      border: 1px solid rgb(226, 220, 220);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      box-shadow: 1px 2px 4px rgb(204, 194, 194);

      .sub_menu {
        width: 200px;
        margin-top: 10px;
        background-color: #fff;
        display: flex;
        flex-direction: column;

        .menu_title {
          font-size: 20px;
          font-weight: bold;
          text-align: center;
          padding: 10px;
          color: rgb(88, 80, 80);
          border-top: 2px solid rgb(124, 110, 110);
        }
        ul {
          padding: 10px;
          li {
            text-align: center;
            height: 20px;
            line-height: 20px;
            margin: 3px;
            span {
              font-size: 14px;
              cursor: pointer;
              font-weight: bold;
              color: rgb(92, 77, 77);
            }
            &:hover {
              font-weight: bold;
            }
          }
          li:hover {
            font-size: 1.05em;
            text-shadow: 1px 1px 1px rgb(133, 106, 106);
            color: rgb(92, 77, 77);
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
              <span onClick={() => navigate('/admin/page/statistics')}>종합 통계</span>
            </li>
            <li>
              <span onClick={() => navigate('/admin/page/userlist')}>회원 목록 및 상세 정보</span>
            </li>
            <li>
              <span onClick={() => navigate('/admin/page/grade')}>회원 등급 관리</span>
            </li>
          </ul>
        </div>
        <div className='sub_menu' id='goods_menu'>
          <p className='menu_title'>상품 관리</p>
          <ul>
            <li>
              <span onClick={() => navigate('/admin/page/goods/modify')}>상품 등록/수정/삭제</span>
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
              <span onClick={() => navigate('/admin/page/orderlist')}>전체 주문 목록</span>
            </li>
            <li>
              <span onClick={() => navigate('/admin/page/delivery')}>주문 상세 및 상태 변경</span>
            </li>
            {/* <li>
              <span>반품 처리</span>
            </li> */}
          </ul>
        </div>
        <div className='sub_menu' id='border_menu'>
          <p className='menu_title'>메인 관리</p>
          <ul>
            <li>
              <span onClick={() => navigate('/admin/page/banner')}>메인 배너 관리</span>
            </li>
            <li>
              <span onClick={() => navigate('/admin/page/best')}>추천 상품 관리</span>
            </li>
          </ul>
        </div>
      </div>
    </AdminMenuComp>
  );
}
