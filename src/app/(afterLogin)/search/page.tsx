import style from './search.module.css';
import BackButton from '@/app/(afterLogin)/_component/BackButton';
import SearchForm from '@/app/(afterLogin)/_component/SearchForm';
// import Tab from '@/app/(afterLogin)/search/_component/Tab';
import Post from '@/app/(afterLogin)/_component/Post';
import Tab from './_component/Tab';
import SearchResult from './_component/SearchResult';

type Props = {
  // 탭 누를떄마다, 변경되는 쿼리파람까지도 생각해서 타입 지정하는게 좋다!!
  searchParams: { q: string; f?: string; pf?: string };
};
// searchParams안에 들어가있다고 생각하면됨.
export default function Search({ searchParams }: Props) {
  return (
    <main className={style.main}>
      <div className={style.searchTop}>
        <div className={style.searchZone}>
          <div className={style.buttonZone}>
            <BackButton />
          </div>
          <div className={style.formZone}>
            <SearchForm q={searchParams.q} />
          </div>
        </div>
        <Tab />
      </div>
      <div className={style.list}>
        <SearchResult searchParams={searchParams} />
      </div>
    </main>
  );
}
