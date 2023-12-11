import style from './post.module.css';
import Link from 'next/link';
import dayjs from 'dayjs';
// fromnow를 쓸수있게해주는 플러그인 day.js는 플러그인 방식
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import ActionButtons from './ActionButton';
import PostArticle from './PostArticle';
// { } named import,
import { faker } from '@faker-js/faker';
import PostImages from './PostImages';
import { Post } from '@/model/Post';

dayjs.locale('ko');
dayjs.extend(relativeTime);

type Props = {
  noImage?: boolean;
  post: Post;
};

export default function Post({ noImage, post }: Props) {
  const target = post;

  // if (Math.random() > 0.5 && !noImage) {
  //   target.Images.push(
  //     { imageId: 1, link: faker.image.urlLoremFlickr() },
  //     { imageId: 2, link: faker.image.urlLoremFlickr() },
  //     { imageId: 3, link: faker.image.urlLoremFlickr() },
  //     { imageId: 4, link: faker.image.urlLoremFlickr() }
  //   );
  // }

  return (
    // 일부분만 클라이언트로 바꾸는것도 좋음. 서버는 {children}으로, 같이 쓰는 방법 서버/클라이언트 컴포넌트.
    // 서버컴포넌트는 클라이언트 컴포넌트 자식일 떄, children이나 props로 나온다.
    <PostArticle post={target}>
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link href={`/${target.User.id}`} className={style.postUserImage}>
            <img src={target.User.image} alt={target.User.nickname} />
            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${target.User.id}`}>
              <span className={style.postUserName}>{target.User.nickname}</span>
              &nbsp;
              <span className={style.postUserId}>@{target.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className={style.postDate}>
              {dayjs(target.createdAt).fromNow(true)}
            </span>
          </div>
          <div>{target.content}</div>
          {!noImage && (
            <div>
              <PostImages post={target} />
            </div>
          )}
          <ActionButtons />
        </div>
      </div>
    </PostArticle>
  );
}
