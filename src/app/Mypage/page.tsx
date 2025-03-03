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

interface ReservationInfo {
    locker_identifier: string;
    start_date: string;
    end_date: string;
}

// 날짜 형식 변환 함수 추가
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
};

export default function Mypage() {
    const router = useRouter();
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_KEY!
    );
    const [user, setUser] = useState<UserInfo | null>(null);
    const [reservation, setReservation] = useState<ReservationInfo | null>(null);
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

    useEffect(() => {
        const fetchReservation = async () => {
            const user_id = localStorage.getItem('user_id');
            const { data, error } = await supabase.rpc('get_user_reservations', {
                user_id_input: user_id
            });
            if (error) {
                console.error('예약 정보 가져오기 오류:', error);
            } else {
                setReservation(data[0]);
            }
        };
        fetchReservation();
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
                    <div className='MypageInfoBox3'>
                        <p className='MypageInfoBox3ItemTitle'>예약 중인 사물함</p>
                        {reservation ? (
                            <>
                                <p className='MypageInfoBox3ItemText'><strong>{reservation.locker_identifier}</strong></p>
                                <div className='MypageInfoBox3Date'>
                                    <img src='/img/icons/Calendar.svg' alt='기간' />
                                    <p className='MypageInfoBox3ItemText'>
                                        {reservation.start_date && formatDate(reservation.start_date)} ~ 
                                        {reservation.end_date && formatDate(reservation.end_date)}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <p className='MypageInfoBox3Empty'>현재 예약 중인 사물함이 없습니다.</p>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}