// Home Tab과 Search 탭이 달라서, 따로 분리 (주소창 변경 유무)
'use client';

import style from '../search.module.css';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
export default function Tab() {
  const [current, setCurrent] = useState('hot');
  const router = useRouter();
  const searchParams = useSearchParams();
  const onClickHot = () => {
    setCurrent('hot');
    // prop으로 받아도되고, 클라이언트에서는, useSearchParams로 받아올 수 있음 편하게!!
    let url = `/search?q=${searchParams.get('q')}`;
    // has가 좋은이유 -> true/false bool값으로 나옴
    if (searchParams.has('pf')) {
      url += `&pf=${searchParams.get('pf')}`;
    }
    router.replace(url);
  };
  const onClickNew = () => {
    setCurrent('new');
    // searchParams.toString() 현재 search Param 기존에 있는거 다쓰고, 하나 더 추가
    let url = `/search?q=${searchParams.get('q')}&f=live`;
    if (searchParams.has('pf')) {
      url += `$pf=${searchParams.get('pf')}`;
    }
  };

  return (
    <div className={style.homeFixed}>
      <div className={style.homeTab}>
        <div onClick={onClickHot}>
          인기
          <div className={style.tabIndicator} hidden={current === 'new'}></div>
        </div>
        <div onClick={onClickNew}>
          최신
          <div className={style.tabIndicator} hidden={current === 'hot'}></div>
        </div>
      </div>
    </div>
  );
}
