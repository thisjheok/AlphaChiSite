'use client';
import './Header.css'
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  return (
    <div className="Header">
      <div className="Header-logo">
        ALPHACHI
      </div>
      <div className="Header-icons">
        <div className="Header-user" onClick={() => router.push('/Mypage')}>
          <img src="/img/icons/User.svg" alt="user"/>
        </div>
      </div>
    </div>
  );
};

export default Header;
