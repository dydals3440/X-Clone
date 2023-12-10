'use client';

import { usePathname } from 'next/navigation';
import Trend from './Trend';
import style from './trendSection.module.css';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

import { getTrends } from '../_lib/getTrends';
import { Hashtag } from '@/model/Hashtag';

export default function TrendSection() {
  const { data: session } = useSession();
  const { data } = useQuery<Hashtag[]>({
    queryKey: ['trends'],
    queryFn: getTrends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    // 로그인한 사용자가 있으면 enabled(로그인한 사용자가 없으면 안되도록 enabled 가능!)
    enabled: !!session?.user,
  });
  // /compose/tweet -> /compose/tweet
  const pathname = usePathname();

  if (pathname === '/explore') return null;
  if (session?.user) {
    return (
      <div className={style.trendBg}>
        <div className={style.trend}>
          <h3>나를 위한 트렌드</h3>
          {data?.map((trend) => (
            <Trend trend={trend} key={trend.tagId} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className={style.trendBg}>
      <div className={style.noTrend}>트렌드를 가져올 수 없습니다.</div>
    </div>
  );
}
