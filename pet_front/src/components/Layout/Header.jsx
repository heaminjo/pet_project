import { useNavigate } from 'react-router-dom';
import HeaderComp from './Headerstyle';
import Nav from './Nav';
import { useContext, useEffect, useState } from 'react';
import { PetContext } from '../../App';
import MemberApi from '../../api/MemberApi';
import logo from '../../images/몽냥마켓로고.png';

export default function Header() {
  const navigate = useNavigate();
  const [role, setRole] = useState(sessionStorage.getItem('role'));
  

  //로그아웃 클릭
  const clickLogout = async () => {
    await MemberApi.logout();
    sessionStorage.clear();
    alert('로그아웃 됩니다.');
    navigate('/');
  };

  // 로고 가져오기
  useEffect(() => {
    // getLogo();
  }, []);
  return (
    <HeaderComp>
      <div className='header_inner'>
        <div className='left' /> {/* 왼쪽 공간: 비워두기 */}
        <div className='center'>
          <img src={logo} alt='로고' onClick={() => navigate('/')} />
        </div>
        <ul className='member_menu'>
          {sessionStorage.getItem('loginName') != null ? (
            <>
              <li>
                <span className='text'>{sessionStorage.getItem('loginName')}님 환영합니다</span>
              </li>
              <li>
                <span onClick={() => clickLogout()} className='text'>
                  로그아웃
                </span>
              </li>
            </>
          ) : (
            <>
              <li>
                <span onClick={() => navigate('/login')} className='text'>
                  로그인
                </span>
              </li>
              <li>
                <span onClick={() => navigate('/join')} className='text'>
                  회원가입
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
      <Nav />
    </HeaderComp>
  );
}
