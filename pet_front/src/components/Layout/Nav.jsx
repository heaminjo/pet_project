import { useNavigate } from 'react-router-dom';
import NavComp from './NavStyle';
import { PetContext } from '../../App';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidShoppingBag } from 'react-icons/bi';
import { MdGrade } from 'react-icons/md';
import { LuClipboardPenLine } from 'react-icons/lu';
import { FaUserAlt } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';
import { IoMdHome } from 'react-icons/io';

export default function Nav() {
  const navigate = useNavigate();

  //로그인 체크
  //비 로그인 시 로그인 화면으로 이동동

  const clickMyPage = () => {
    if (sessionStorage.getItem('role') == 'ROLE_ADMIN') {
      navigate('/admin/page/statistics');
    } else if (sessionStorage.getItem('loginName') != null) {
      navigate('/user/mypage/myinfo');
    } else {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
    }
  };
  return (
    <NavComp>
      <div className='nav_inner'>
        <ul className='nav_menu'>
          <li onClick={() => navigate('/')}>
            <span>
              홈 <IoMdHome />
            </span>
          </li>
          <li onClick={() => navigate('/goods/list')}>
            <span>
              펫스토어 <BiSolidShoppingBag />
            </span>
          </li>

          <li className='dropdown'>
            <span>강아지 용품</span>
            <ul className='dropdown_content'>
              <li className='submenu'>
                <ul className='title'>소모품</ul>
                <ul>
                  <li onClick={() => navigate('/goods/dog/house')}>강아지 하우스</li>
                  <li onClick={() => navigate('/goods/dog/kennel')}>강아지 켄넬</li>
                  <li onClick={() => navigate('/goods/dog/toy')}>강아지 장난감</li>
                </ul>
              </li>
              <li className='submenu'>
                <ul className='title'>먹이/간식</ul>
                <ul>
                  <li onClick={() => navigate('/goods/cat/feed')}>강아지 사료</li>
                  <li onClick={() => navigate('/goods/cat/supplement')}>강아지 간식</li>
                  <li onClick={() => navigate('/goods/cat/supplement')}>강아지 영양제</li>
                  <li onClick={() => navigate('/goods/cat/toy')}>강아지 위생/의료</li>
                </ul>
              </li>
            </ul>
          </li>

          <li className='dropdown'>
            <span>고양이 용품</span>
            <ul className='dropdown_content'>
              <li className='submenu'>
                <ul className='title'>소모품</ul>
                <ul>
                  <li onClick={() => navigate('/goods/cat/house')}>고양이 하우스</li>
                  <li onClick={() => navigate('/goods/cat/snack')}>고양이 캣타워</li>
                  <li onClick={() => navigate('/goods/cat/toy')}>고양이 장난감</li>
                </ul>
              </li>
              <li className='submenu'>
                <ul className='title'>먹이/간식</ul>
                <ul>
                  <li onClick={() => navigate('/goods/cat/supplement')}>고양이 모래</li>
                  <li onClick={() => navigate('/goods/cat/supplement')}>고양이 영양제</li>
                  <li onClick={() => navigate('/goods/cat/toy')}>고양이 위생/의료</li>
                </ul>
              </li>
            </ul>
          </li>

          <li onClick={() => navigate('/grade')}>
            <span>
              등급별 혜택 <MdGrade />
            </span>
          </li>

          <li onClick={() => navigate('/boardList/free')}>
            <span>
              게시판 <LuClipboardPenLine />
            </span>
          </li>

          {sessionStorage.getItem('role') == 'ROLE_ADMIN' ? (
            <li onClick={() => clickMyPage()}>
              <span>
                관리자페이지 <RiAdminFill />
              </span>
            </li>
          ) : (
            <li onClick={() => clickMyPage()}>
              <span>
                마이페이지 <FaUserAlt />
              </span>
            </li>
          )}
        </ul>
      </div>
    </NavComp>
  );
}
