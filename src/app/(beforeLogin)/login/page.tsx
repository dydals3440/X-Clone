'use client';

import { useRouter } from 'next/navigation';
import Main from '../_component/Main';
import { useSession } from 'next-auth/react';

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();
  if (session?.user) {
    router.replace('/home');
    return null;
  }
  router.replace('/i/flow/login');
  return <Main />;
}

// router.push (뒤로가기시, 이전경로로 간다. login <-> flow/login 왔다갔다 무한 반복하게 됨을 방지)
// localhost:3001/login -> localhost:3001/i/flow/login

// router.replace (뒤로 가기시 => 로그인보다 더 전거)
// localhost:3001/login -> localhost:3001/i/flow/login
// -> 바로 localhost:3001로 이동.
