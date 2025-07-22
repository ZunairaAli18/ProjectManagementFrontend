'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Guard({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (!user) {
      router.push('/login');
    } else {
      setChecked(true);
    }
  }, []);

  if (!checked) return null;
  return <>{children}</>;
}
