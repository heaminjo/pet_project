import { useState } from 'react';
import styled from 'styled-components';

const PopupComp = styled.div`
  .container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .content {
    background: white;
    padding: 20px;
    border-radius: 12px;
    width: 600px;
    max-width: 90%;
    position: relative;
  }

  .close {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 8px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 18px;
    cursor: pointer;
  }
`;

export default function Popup({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <PopupComp>
      <div className='container'>
        <div className='content'>
          <button className='close' onClick={onClose} style={{ width: '30px' }}>
            ✖
          </button>
          {children}
        </div>
      </div>
    </PopupComp>
  );
}
