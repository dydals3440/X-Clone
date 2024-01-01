import { Suspense } from 'react';
import PostForm from './_component/PostForm';
import Tab from './_component/Tab';
import TabProvider from './_component/TabProvider';
import style from './home.module.css';
import { getPostRecommends } from './_lib/getPostRecommends';
import PostRecommends from './_component/PostRecommends';
import TabDecider from './_component/TabDecider';
import TabDeciderSuspense from './_component/TabDeciderSuspense';
import Loading from './loading';

export default async function Home() {
  // throw '에러'로 에러 확인가능!
  // throw '으하하하';
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm />
        {/* 이부분만 나중에 로딩되길 원하니 Suspense가 이쪽에 있어야지 밑에 로딩되고 있는 애들을 감지할 수 있음. 그래서 query logic들을 Tabdecider suspense로 옮겨줌.로딩이 필요없는애들은 바깥으로 빼자.*/}
        {/* 1. page.tsx -> loading 2. 서버 Suspense -> fallback, 3. react-query -> isPending */}
        <Suspense fallback={<Loading />}>
          <TabDeciderSuspense />
        </Suspense>
        {/* <PostRecommends /> */}
      </TabProvider>
    </main>
  );
}
