import { useState, useEffect } from "react";
import './CabinetLists.css';
import './BookCabinet.css';
// 백엔드 응답을 시뮬레이션하는 타입과 더미 데이터
interface ReservationData {
    cabinetId: string;
    isReserved: boolean;
    userId?: string;
}

// 백엔드 API 호출을 시뮬레이션하는 함수
const fetchReservations = async (): Promise<ReservationData[]> => {
    // 실제로는 여기서 API 호출을 하게 됩니다
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { cabinetId: 'a1', isReserved: true, userId: 'user1' },
                { cabinetId: 'b3', isReserved: true, userId: 'user2' },
                { cabinetId: 'c5', isReserved: true, userId: 'user3' },
            ]);
        }, 0); // 1초 딜레이로 실제 API 호출처럼 보이게 함
    });
};

interface CabinetListsProps {
    startDate: string;
    endDate: string;
}

export default function CabinetLists({ startDate, endDate }: CabinetListsProps) {
    const [selectedCabinet, setSelectedCabinet] = useState<string | null>(null);
    const cabinets = [
        ['a1', 'a2', 'a3', 'a4', 'a5'],
        ['b1', 'b2', 'b3', 'b4', 'b5'],
        ['c1', 'c2', 'c3', 'c4', 'c5'],
        ['d1', 'd2', 'd3', 'd4', 'd5'],
        ['e1', 'e2', 'e3', 'e4', 'e5'],
    ];
    
    const [isLoading, setIsLoading] = useState(true);
    
    const [reservations, setReservations] = useState<{ [key: string]: boolean }>(() => {
        const initialState: { [key: string]: boolean } = {};
        cabinets.flat().forEach(cabinet => {
            initialState[cabinet] = false;
        });
        return initialState;
    });

    useEffect(() => {
        const loadReservations = async () => {
            try {
                const data = await fetchReservations();
                const newReservations = { ...reservations };
                data.forEach(reservation => {
                    newReservations[reservation.cabinetId] = reservation.isReserved;
                });
                setReservations(newReservations);
            } catch (error) {
                console.error('예약 데이터를 불러오는데 실패했습니다:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadReservations();
    }, []);

    const CabinetElement = ({ cabinet }: { cabinet: string }) => {
        return (
            <div 
                className={`cabinet-element ${reservations[cabinet] ? 'reserved' : ''} ${selectedCabinet === cabinet ? 'selected' : ''}`}
                onClick={() => !reservations[cabinet] && setSelectedCabinet(cabinet)}
            >
                {cabinet}
            </div>
        )
    }
    
    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    return (
        <>
        <h2 className="BookCabinetTitle">예약할 캐비넷을 선택해주세요</h2>
        <div className="cabinet-list">
            {cabinets.flat().map((cabinet) => (
                <CabinetElement key={cabinet} cabinet={cabinet} />
            ))}
        </div>
        <div className="BookCabinetButtonContainer">
            <button className="BookCabinetButton" onClick={() => {console.log(selectedCabinet, startDate, endDate)}}>예약하기</button>
        </div>
        </>
    );
}   