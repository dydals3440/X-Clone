import Post from '@/app/(afterLogin)/_component/Post';
import CommentForm from '@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm';

import style from './photoModal.module.css';
import PhotoModalCloseButton from '@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/_component/PhotoModalCloseButton';
import { faker } from '@faker-js/faker';
import ActionButtons from '@/app/(afterLogin)/_component/ActionButton';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getSinglePost } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost';
import { getComments } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getComments';
import SinglePost from '@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost';
import Comments from '@/app/(afterLogin)/[username]/status/[id]/_component/Comments';
import ImageZone from './_component/ImageZone';

type Props = {
  params: { id: string };
};

export default async function Default({ params }: Props) {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['posts', id],
    queryFn: getSinglePost,
  });

  await queryClient.prefetchQuery({
    queryKey: ['posts', id, 'comments'],
    queryFn: getComments,
  });

  const dehydratedStatus = dehydrate(queryClient);

  // const photo = {
  //   imageId: 1,
  //   link: faker.image.urlLoremFlickr(),
  //   Post: {
  //     content: faker.lorem.text(),
  //   },
  // };

  return (
    <div className={style.container}>
      <HydrationBoundary state={dehydratedStatus} />
      <PhotoModalCloseButton />
      <ImageZone id={id} />
      <div className={style.commentZone}>
        <SinglePost id={id} noImage />
        <CommentForm id={id} />
        <Comments id={id} />
      </div>
    </div>
  );
}
