'use client';
import './Complete.css';
import { useRouter } from 'next/navigation';

export default function Complete() {
    const router = useRouter();
    const handleBackPage = () => {
        router.back();
    }
    return (
        <div className="CompleteContainer">
                        <div className='back-button'>  
                <img src='/img/icons/back-button.svg' alt='back-button' onClick={handleBackPage}/>
            </div>
            <h1 className="CompleteTitle">예약이 완료되었어요.</h1>
            <p className="CompleteDescription">예약 종료일에 맞게 캐비닛을 반납해주세요.</p>
            <div className="CompleteImageContainer">
                <img className='CompleteImage' src="/img/icons/complete.svg" alt="완료" />
            </div>
            <div className="CompleteButtonContainer">
                <button className="CompleteButton" onClick={() => router.push('/')}>확인</button>
            </div>
        </div>
    )
}