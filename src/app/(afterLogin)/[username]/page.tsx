import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import BackButton from '../_component/BackButton';
import style from './profile.module.css';
import Post from '@/app/(afterLogin)/_component/Post';
import UserPosts from './_component/UserPosts';
import { getUserPosts } from './_lib/getUserPosts';
import { getUser } from './_lib/getUser';
import UserInfo from './_component/UserInfo';

type Props = {
  params: { username: string };
};

// SSR
// 1. 검색페이지 노출해야하는 곳에 SSR (유저글 상세페이지, 검색 페이지: Next는 기본적으로 SSR)
export default async function Profile({ params }: Props) {
  const { username } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['users', username],
    queryFn: getUser,
  });
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'users', username],
    queryFn: getUserPosts,
  });
  const dehydratedState = dehydrate(queryClient);

  // const user = {
  //   id: 'dydals3440',
  //   nickname: '매튜',
  //   image: '/5Udwvqim.jpg',
  // };

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
