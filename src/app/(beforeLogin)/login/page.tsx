'use client';

import Image from 'next/image';
import styles from '@/app/page.module.css';

import Link from 'next/link';
import zLogo from '../../../../public/zlogo.png';

import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  router.replace('/i/flow/login');
  return (
    <>
      <div className={styles.left}>
        <Image src={zLogo} alt='logo' />
      </div>
      <div className={styles.right}>
        <h1>지금 일어나고 있는 일.</h1>
        <h2>지금 가입하세요.</h2>
        {/* a태그 새로고침되면서 넘어감 */}
        <Link href='/i/flow/signup' className={styles.signup}>
          계정 만들기
        </Link>
        <Link href='/i/flow/login' className={styles.login}>
          로그인
        </Link>
      </div>
    </>
  );
}

// router.push (뒤로가기시, 이전경로로 간다. login <-> flow/login 왔다갔다 무한 반복하게 됨을 방지)
// localhost:3001/login -> localhost:3001/i/flow/login

// router.replace (뒤로 가기시 => 로그인보다 더 전거)
// localhost:3001/login -> localhost:3001/i/flow/login
// -> 바로 localhost:3001로 이동.
