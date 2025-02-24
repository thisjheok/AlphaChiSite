import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import './CabinetLists.css';
import './BookCabinet.css';
import { createClient } from '@supabase/supabase-js';
interface ReservationData {
    identifier: string;
    is_reserved: boolean;
    userId?: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);


interface CabinetListsProps {
    startDate: string;
    endDate: string;
    user_id: number;
}

export default function CabinetLists({ startDate, endDate, user_id }: CabinetListsProps) {
    const router = useRouter();

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

    const fetchReservations = async () => {
        let { data, error } = await supabase
            .rpc('check_lockers_reservation', {
                start_date_input: startDate,
                end_date_input: endDate
            })
        if (error) console.error(error)
        else {
            console.log(data)
            return data;
        }
    }
    

    useEffect(() => {
        const loadReservations = async () => {
            try {
                const data = await fetchReservations();
                const newReservations = { ...reservations };
                data.forEach((reservation: ReservationData) => {
                    newReservations[reservation.identifier] = reservation.is_reserved;
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

    const convertCabinetIdToNumber = (cabinetId: string): number => {
        const row = cabinetId.charAt(0).toLowerCase();
        const col = parseInt(cabinetId.charAt(1));
        const rowNumber = row.charCodeAt(0) - 'a'.charCodeAt(0);
        return rowNumber * 5 + col;
    }

    const handleMakeReservation = async (userId: number) => {
        if (!selectedCabinet) return;
        
        const numericLockerId = convertCabinetIdToNumber(selectedCabinet);
        const { data, error } = await supabase
            .rpc('make_reservation', {
                locker_id_input: numericLockerId,
                start_date_input: startDate,
                end_date_input: endDate,
                user_id_input: userId
            })
        if (error){
            console.error(error)
        }
        else {
            console.log(data)
            router.push('/BookCabinet/Complete');
        }
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
            <button 
                className="BookCabinetButton" 
                onClick={() => {
                    handleMakeReservation(user_id);
                }}
            >
                예약하기
            </button>
        </div>
        </>
    );
}   