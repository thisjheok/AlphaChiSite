'use client'

import './BookCabinet.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react';
import CabinetLists from './CabinetLists';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function BookCabinet() {
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);
    const [userIdNumber, setUserIdNumber] = useState<number>(0);

    useEffect(() => {
        // localStorage 접근을 클라이언트 사이드에서만 수행
        const storedUserId = localStorage.getItem('user_id');
        setUserId(storedUserId);
        setUserIdNumber(parseInt(storedUserId || '0'));
        
        if (storedUserId === null) {
            toast.error('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.', {
                position: "bottom-center",
                autoClose: 1500,
                transition: Bounce,
                onClose: () => router.push('/Login')
            });
        }
    }, []);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [currentPage, setCurrentPage] = useState(1);
    const handleDateChange = (
        value: Value, 
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (value instanceof Date || Array.isArray(value)) {
            const date = Array.isArray(value) ? value[0] : value;
            if (date) {
                if (currentPage === 1) {
                    setStartDate(date);
                } else {
                    setEndDate(date);
                }
            }
        }
    };

    const handleBackPage = () => {
        if (currentPage === 1){
            router.push('/Main');
        };
        setCurrentPage(currentPage - 1);
    }

    const SetStartDatePage = () => {
        return (
            <>
            <h2 className="BookCabinetTitle">시작일을 입력해주세요</h2>
                <Calendar 
                    onChange={handleDateChange}
                    value={startDate}
                    locale="ko-KR"
                    formatDay={(locale, date) => date.getDate().toString()}
                />
            <div className="BookCabinetButtonContainer">
                    <button className="BookCabinetButton" onClick={() => setCurrentPage(2)}>다음으로</button>
            </div>
            </>
        )
    }

    const SetEndDatePage = () => {
        const handleNextClick = () => {
            // 시작일과 종료일 사이의 일수 계산
            const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays > 7) {
                toast.error('예약 기간은 최대 7일까지 가능합니다.', {
                    position: "bottom-center",
                    autoClose: 3000,
                    transition: Bounce
                });
            } else {
                setCurrentPage(3);
            }
        };

        return (
            <>
            <h2 className="BookCabinetTitle">종료일을 입력해주세요</h2>
                <Calendar 
                onChange={handleDateChange}
                value={endDate}
                locale="ko-KR"
                formatDay={(locale, date) => date.getDate().toString()}
            />
            <div className="BookCabinetButtonContainer">
                    <button className="BookCabinetButton" onClick={handleNextClick}>다음으로</button>
            </div>
            </>
        )
    }

    return (
        <div className="BookCabinetContainer">
            <div className='back-button'>  
                <img src='/img/icons/back-button.svg' alt='back-button' onClick={handleBackPage}/>
            </div>
            {
                currentPage === 1 
                    ? <SetStartDatePage /> 
                    : currentPage === 2 
                        ? <SetEndDatePage />
                        : <CabinetLists 
                            startDate={startDate.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '-').replace('.', '')} 
                            endDate={endDate.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '-').replace('.', '')}
                            user_id={userIdNumber}
                          />
            }
            <ToastContainer />
        </div>
    )
}