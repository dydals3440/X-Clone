'use server';

import { redirect } from 'next/navigation';
import { signIn } from '@/auth';

export default async (prevState: any, formData: FormData) => {
  if (!formData.get('id') || !(formData.get('id') as string)?.trim()) {
    return { message: 'no_id' };
  }
  if (!formData.get('name') || !(formData.get('name') as string)?.trim()) {
    return { message: 'no_name' };
  }
  if (
    !formData.get('password') ||
    !(formData.get('password') as string)?.trim()
  ) {
    return { message: 'no_password' };
  }
  if (!formData.get('image')) {
    return { message: 'no_image' };
  }

  let shouldRedirect = false;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      {
        method: 'post',
        body: formData,
        // 이게 있어야 쿠키가 전달됨
        // 이미 로그인한 사람이 또 로그인한 경우에는 쿠키가 있어야지만 로그인했냐 안했냐 알 수도있음.
        credentials: 'include',
      }
    );
    console.log(response.status);
    if (response.status === 403) {
      return { message: 'user_exists' };
    }
    console.log(await response.json());
    shouldRedirect = true;
    // 회원가입 성공한 후, 로그인까지 같이 해버리는 것.
    await signIn('credentials', {
      username: formData.get('id'),
      password: formData.get('password'),
      // redirect: true시 서버쪽에서 하기 때문에 router.replace활용 (클라이언트 컴포넌트이기 떄문)
      redirect: false,
    });
  } catch (err) {
    console.error(err);
    return;
  }

  if (shouldRedirect) {
    redirect('/home'); // redirect는 try catch 내부에서 X
  }
};
