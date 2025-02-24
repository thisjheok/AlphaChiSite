'use client';
import './Mypage.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { createClient } from '@supabase/supabase-js';

interface UserInfo {
    name: string;
    department: string;
    rank: string;
}

export default function Mypage() {
    const router = useRouter();
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_KEY!
    );
    const [user, setUser] = useState<UserInfo | null>(null);

    useEffect(() => {
        const user_id = localStorage.getItem('user_id');
        if (!user_id) {
            toast.warning('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                transition: Bounce,
                pauseOnHover: true,
                draggable: true,
                onClose: () => router.push('/Login')
            });
        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const user_id = localStorage.getItem('user_id');
            const { data, error } = await supabase.rpc('get_user_info', {
                user_id_input: user_id
            });
            if (error) {
                console.error('유저 정보 가져오기 오류:', error);
            } else {
                setUser(data[0]);
            }
        };
        fetchUser();
    }, []);
    return (
        <div className='MypageContainer'>
            <div className='MypageHeader'>
                <img src='/img/icons/back-button.svg' alt='back' className='MypageBackButton' onClick={() => router.push('/')}/>
                <h1 className='MypageTitle'>마이페이지</h1>
            </div>
            <div className='MypageBox'>
                <div className='MypageInfo'>
                    <div className='MypageInfoProfileBox'>
                        <img src='/img/profile.svg' alt='user' className='MypageInfoProfileImg'/>
                        <div className='MypageInfoProfile'>
                            <p className='MypageInfoProfileName'>{user?.name}</p>
                            <p className='MypageInfoProfileDepartment'>{user?.department}</p>
                        </div>
                    </div>
                    {/* <div className='MypageProfileEditBtn'>
                        <img src='/img/icons/camera.svg' alt='edit' className='MypageProfileEditBtnImg'/>
                        프로필 사진 변경
                    </div> */}
                    <div className='MypageInfoBox2'>
                        <div className='MypageInfoBox2Item'>
                            <p className='MypageInfoBox2ItemTitle'>기수</p>
                            <p className='MypageInfoBox2ItemText'>{user?.rank}기</p>
                        </div>
                        <div className='MypageInfoBox2Item'>
                            <p className='MypageInfoBox2ItemTitle'>회원 상태</p>
                            <p className='MypageInfoBox2ItemText'>재학생</p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}