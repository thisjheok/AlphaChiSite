'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Main from "./Main/page";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    if (user_id === null) {
      router.push('/Login');
    }
  }, []);

  return (
    <div>
      <Main />
    </div>
  );
}
