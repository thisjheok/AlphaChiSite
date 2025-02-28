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
    const user_id = localStorage.getItem('user_id');
    const user_id_number = parseInt(user_id || '0');

    useEffect(() => {
        if (user_id === null) {
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
            router.push('/');
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
                    <button className="BookCabinetButton" onClick={() => setCurrentPage(3)}>다음으로</button>
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
                            user_id={user_id_number}
                          />
            }
            <ToastContainer />
        </div>
    )
}