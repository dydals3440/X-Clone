'use client';
import { useEffect } from 'react';

export const MSWComponent = () => {
  useEffect(() => {
    // 브라우저에서만 돌아간다는 것을 보장 MSW 2.0
    if (typeof window !== 'undefined') {
      if (process.env.NEXT_REPUBLIC_API_MOCKING === 'enabled') {
        require('@/mocks/browser');
      }
    }
  }, []);
  return null;
};
