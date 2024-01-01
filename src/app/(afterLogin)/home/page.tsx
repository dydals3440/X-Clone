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
import TabDecider from './_component/TabDecider';

export default async function Home() {
  const queryClient = new QueryClient();
  // 요런 키를 갖고있는 애일떄는, queryFn을 실행해서 값을 가져와라
  // 값을 갖고올떄는 queryClient.getQueryData(['posts', 'recommends']), 수정시는 setQueryData
  // prefetchQuery -> prefetchInfiniteQuery로 변경해서 무한 스크롤
  // 로딩이 안보이는이유(로딩처리해줬는데도) 서버에서, 불러와서 dehydrate했기 때문에 로딩 보여줄새가없음.
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    // 커서 값
    initialPageParam: 0,
  });
  // dehydratedState을 리액트쿼리가 hydrate(서버에서 온 데이터를 형식맞춰서 클라이언트가 받음.)
  const dehydratedState = dehydrate(queryClient);
  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <TabDecider />
          {/* <PostRecommends /> */}
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
