'use client'

import './BookCabinet.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect, memo, useCallback } from 'react';
import CabinetLists from './CabinetLists';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createClient } from '@supabase/supabase-js';
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// 캘린더 컴포넌트를 별도 컴포넌트로 분리
const DateSelector = memo(({ 
    title, 
    date, 
    onDateChange 
}: { 
    title: string, 
    date: Date, 
    onDateChange: (date: Date) => void 
}) => {
    // 내부 상태로 날짜를 관리하여 부모 컴포넌트의 리렌더링에 영향을 받지 않도록 함
    const [internalDate, setInternalDate] = useState(date);
    
    const handleChange = (value: Value) => {
        if (value instanceof Date) {
            setInternalDate(value);
            onDateChange(value);
        } else if (Array.isArray(value) && value[0]) {
            setInternalDate(value[0]);
            onDateChange(value[0]);
        }
    };
    
    return (
        <>
            <h2 className="BookCabinetTitle">{title}</h2>
            <Calendar 
                onChange={handleChange}
                value={internalDate}
                locale="ko-KR"
                formatDay={(locale, date) => date.getDate().toString()}
            />
        </>
    );
});

DateSelector.displayName = 'DateSelector';

export default function BookCabinet() {
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);
    const [userIdNumber, setUserIdNumber] = useState<number>(0);
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_KEY!
    );
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
    const [pageTransition, setPageTransition] = useState('');
    const [selectedCabinet, setSelectedCabinet] = useState<string | null>(null);

    // 날짜 변경 핸들러를 useCallback으로 메모이제이션
    const handleStartDateChange = useCallback((date: Date) => {
        setStartDate(date);
    }, []);

    const handleEndDateChange = useCallback((date: Date) => {
        setEndDate(date);
    }, []);

    const handleBackPage = () => {
        if (currentPage === 1){
            router.push('/Main');
        } else {
            setPageTransition('slide-out-right');
            setTimeout(() => {
                setCurrentPage(currentPage - 1);
                setPageTransition('slide-in-left');
            }, 300);
        }
    }

    const handleNextPage = () => {
        setPageTransition('slide-out-left');
        setTimeout(() => {
            setCurrentPage(currentPage + 1);
            setPageTransition('slide-in-right');
        }, 300);
    }

    const handleBookCabinet = async () => {
        // 캐비넷 ID를 숫자로 변환하는 함수
        const convertCabinetIdToNumber = (cabinetId: string): number => {
            const row = cabinetId.charAt(0).toLowerCase();
            const col = parseInt(cabinetId.charAt(1));
            const rowNumber = row.charCodeAt(0) - 'a'.charCodeAt(0);
            return rowNumber * 5 + col;
        }

        // 날짜 형식 변환
        const formatDateForSupabase = (date: Date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day} 00:00:00+00`;
        };

        if (!selectedCabinet) return;
        
        const numericLockerId = convertCabinetIdToNumber(selectedCabinet);
        const { data, error } = await supabase
            .rpc('make_reservation', {
                locker_id_input: numericLockerId,
                start_date_input: formatDateForSupabase(startDate),
                end_date_input: formatDateForSupabase(endDate),
                user_id_input: userIdNumber
            });

        if (error) {
            console.error(error);
            toast.error('예약에 실패했습니다. 다시 시도해주세요.', {
                position: "bottom-center",
                autoClose: 3000,
                transition: Bounce
            });
        } else {
            console.log(data);
            if (data[0].reservation_id === null || data[0].reservation_id === undefined) {
                toast.error('이미 예약한 사물함을 지니고 있습니다.', {
                    position: "bottom-center",
                    autoClose: 3000,
                    transition: Bounce,
                    onClose: () => router.push('/')
                });
            } else {
                router.push('/BookCabinet/Complete');
            }
        }
    }

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
            setPageTransition('slide-out-left');
            setTimeout(() => {
                setCurrentPage(3);
                setPageTransition('slide-in-right');
            }, 300);
        }
    };

    return (
        <div className="BookCabinetContainer">
            <div className='back-button'>  
                <img src='/img/icons/back-button.svg' alt='back-button' onClick={handleBackPage}/>
            </div>
            
            {/* 페이지 컨텐츠 */}
            {currentPage === 1 && (
                <div className={`page-content ${pageTransition}`}>
                    <DateSelector 
                        title="시작일을 입력해주세요" 
                        date={startDate} 
                        onDateChange={handleStartDateChange} 
                    />
                </div>
            )}
            
            {currentPage === 2 && (
                <div className={`page-content ${pageTransition}`}>
                    <DateSelector 
                        title="종료일을 입력해주세요" 
                        date={endDate} 
                        onDateChange={handleEndDateChange} 
                    />
                </div>
            )}
            
            {currentPage === 3 && (
                <div className={`page-content ${pageTransition}`}>
                    <CabinetLists 
                        startDate={startDate.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '-').replace('.', '')} 
                        endDate={endDate.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '-').replace('.', '')}
                        user_id={userIdNumber}
                        onSelectCabinet={setSelectedCabinet}
                    />
                </div>
            )}
            
            {/* 버튼 컨테이너 */}
            {currentPage !== 3 ? (
                <div className="BookCabinetButtonContainer">
                    <button 
                        className="BookCabinetButton" 
                        onClick={currentPage === 1 ? handleNextPage : handleNextClick}
                    >
                        다음으로
                    </button>
                </div>
            ) : (
                <div className="BookCabinetButtonContainer">
                    <button 
                        className="BookCabinetButton" 
                        onClick={() => {
                            if (!selectedCabinet) {
                                toast.error('캐비넷을 선택해주세요', {
                                    position: "bottom-center",
                                    autoClose: 3000,
                                    transition: Bounce
                                });
                                return;
                            }
                            handleBookCabinet();
                        }}
                    >
                        예약하기
                    </button>
                </div>
            )}
            
            <ToastContainer />
        </div>
    )
}