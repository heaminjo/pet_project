import React, { useState } from 'react';
import styled from 'styled-components';

const OrderTabComp = styled.div`
  .tab-table {
    display: table;
    width: 100%;
    border: 1px solid #ccc;
    border-collapse: collapse;
    table-layout: fixed;
  }

  .tab-row {
    display: table-row;
  }

  .tab-cell {
    display: table-cell;
    text-align: center;
    padding: 12px 0;
    font-size: 14px;
    cursor: pointer;
    background-color: #fafafa;
    border-right: 1px solid #eee;
    border-bottom: 2px solid transparent;
  }

  .tab-cell:last-child {
    border-right: none;
  }

  .tab-cell.active {
    font-weight: bold;
    background-color: #fff;
    border-bottom: 2px solid #000;
  }
`;

const OrderTab = ({ reviewNum }) => {
  const [activeTab, setActiveTab] = useState('상품상세');
  const tabs = ['상품상세', `상품평 (${reviewNum})`, '상품문의', '배송/교환/반품 안내'];

  return (
    <OrderTabComp>
      <div className='tab-table'>
        <div className='tab-row'>
          {tabs.map((tab) => (
            <div key={tab} className={`tab-cell ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* 콘텐츠 렌더링 */}
      <div style={{ marginTop: '16px', padding: '10px', border: '1px solid #ddd' }}>{activeTab} 내용이 여기에 표시됩니다.</div>
    </OrderTabComp>
  );
};

export default OrderTab;
