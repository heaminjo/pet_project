import React, { useEffect, useState } from 'react';
import api from '../../api/goodsApi';
import GoodsCard from '../../components/GoodsCard';
import './SearchPage.css';

function SearchPage() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    api.fetchGoods().then(res => {
      console.log("✅ 백엔드 응답 확인:", res.data); // 응답 확인
      setResults(res.data);
    });
  }, []);

  const filtered = results.filter(g => g.goodsName.includes(keyword)); // ✅ 필드명 수정

  return (
    <div className="search-page">
      <input
        className="search-input"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="검색어 입력"
      />
      <div className="grid">
        {filtered.map(g => <GoodsCard key={g.goodsId} goods={g} />)} {/* ✅ key도 goodsId */}
      </div>
    </div>
  );
}

export default SearchPage;
