import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import Post from '../_component/Post';
import PostForm from './_component/PostForm';
import Tab from './_component/Tab';
import TabProvider from './_component/TabProvider';
import style from './home.module.css';
import { getPostRecommends } from './_lib/getPostRecommends';
import PostRecommends from './_component/PostRecommends';

export default async function Home() {
  const queryClient = new QueryClient();
  // 요런 키를 갖고있는 애일떄는, queryFn을 실행해서 값을 가져와라
  // 값을 갖고올떄는 queryClient.getQueryData(['posts', 'recommends']), 수정시는 setQueryData
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
  });
  // dehydratedState을 리액트쿼리가 hydrate(서버에서 온 데이터를 형식맞춰서 클라이언트가 받음.)
  const dehydratedState = dehydrate(queryClient);
  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <PostRecommends />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
