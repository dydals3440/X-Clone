import Home from '@/app/(afterLogin)/home/page';

// slug들의 값을 params로 받아올 수 있음
type Props = {
  params: { username: string; id: string; photoId: string };
};

export default function Page({ params }: Props) {
  params.username; // elonmusk
  params.id; // 1
  params.photoId; // 1
  return <Home />;
}
