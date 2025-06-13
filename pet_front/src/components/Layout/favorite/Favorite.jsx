import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import GoodsApi from '../../../api/GoodsApi';
import PageNumber from '../../util/PageNumber';
import FavoriteComp from './FavoriteStyle';

export default function Favorite() {
  const navigate = useNavigate();

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상 태 변 수 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // 페이징 관련 상태변수
  const [type, setType] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('desc');
  const [page, setPage] = useState(0); // 1 페이지, 2 페이지, ...
  const [goods, setGoods] = useState([]); // 페이지에 사용되는 goods

  // 페이징 정보 상태변수 (현재 페이징 상태 핸들링 위함)
  const [paging, setPaging] = useState({
    start: 0,
    end: 4,
    isPrev: false,
    isNext: true,
    totalElement: 0,
    totalPages: 0,
  });

  return (
    <FavoriteComp>
      <div className='container'>
        <div className='top'>
          <h2>찜 목록 리스트</h2>
        </div>
        <div className='body'></div>

        <PageNumber page={page} setPage={setPage} paging={paging} />
      </div>
    </FavoriteComp>
  );
}
