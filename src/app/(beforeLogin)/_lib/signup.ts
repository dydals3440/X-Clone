'use server';

import { redirect } from 'next/navigation';

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
  } catch (err) {
    console.error(err);
    return;
  }

  if (shouldRedirect) {
    redirect('/home'); // redirect는 try catch 내부에서 X
  }
};
