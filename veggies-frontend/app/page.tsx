"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const HomeRedirect: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('veggies:token');
    if (!token) {
      router.push('/login');
    } else {
      router.push('/home');
    }
  }, [router]);

  return (
    <div className='w-full flex justify-center items-center'>
      <p>Loading...</p>
    </div>
  );
};

export default HomeRedirect;
