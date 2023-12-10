'use client';

import { signOut, useSession } from 'next-auth/react';
import style from './logoutButton.module.css';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  // 클라이언트에서만 useSession 사용가능
  const { data: me } = useSession();

  // const me = {
  //   id: 'dydals3440',
  //   nickname: '매튜',
  //   image: '/5Udwvqim.jpg',
  // };

  const onLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.replace('/');
    });
  };

  if (!me?.user) {
    return null;
  }

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.user?.image as string} alt={me.user?.email as string} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  );
}
