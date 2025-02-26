'use client';
import './main.css'
import Header from './Header/Header'
import Hello from '../Components/Hello/Hello'
import Notice from './Notice/Notice'
import Menu from './Menu/Menu'
import Activity from './Activity/Activity'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';

const Main = () => {
    const router = useRouter();
    useEffect(() => {
        const user_id = localStorage.getItem('user_id');
        if (user_id === null) {
            toast.error('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.', {
                position: "bottom-center",
                autoClose: 1500,
                transition: Bounce,
                theme: "colored",
                onClose: () => router.push('/Login')
            });
        }
    }, []);
    return (
        <>
            <Header />
            <div className="MainContainer">
                <Hello />
                <Notice />
                <Menu />
                {/* <Activity /> */}
            </div>
            <ToastContainer />
        </>
    )
}

export default Main;