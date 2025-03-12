'use client';
import { createClient } from '@supabase/supabase-js';
import './Notice.css';
import { useRouter } from 'next/navigation';
import NoticeCard from "../Components/NoticeCard/NoticeCard";
import { useState, useEffect } from 'react';

interface NoticeItem {
    title: string;
    date: string;
    content: string;
    id: number;
    writer_id: number;
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export default function Notice() {
    const router = useRouter();
    const [notice, setNotice] = useState<NoticeItem[]>([]);
    useEffect(() => {
        const fetchNotice = async () => {
            const { data, error } = await supabase.rpc('get_latest_notices');
            if (error) {
                console.error('공지사항 가져오기 오류:', error);
            } else {
                console.log('공지사항 가져오기 성공:', data);
                const sortedData = [...data].sort((a, b) => b.id - a.id);
                setNotice(sortedData);
            }
        }
        fetchNotice();
    }, []);
    return (
        <div className='NoticeDetailContainer'>
            <div className='NoticeDetailHeader'>
                <img src='/img/icons/back-button.svg' alt='back' className='NoticeDetailBackButton' onClick={() => router.push('/Main')}/>
                <h1 className='NoticeDetailTitle'>공지사항</h1>
            </div>
            {notice.length > 0 && (
                <div className='NoticeDetailContents'>
                    {notice.map((item) => (
                        <NoticeCard 
                            key={item.id} 
                            title={item.title} 
                            date={item.date} 
                            content={item.content} 
                            id={item.id} 
                            writer_id={item.writer_id} 
                            onClick={() => router.push(`/NoticeDetail/${item.id}`)}    
                        />
                    ))}
                </div>
            )}
        </div>
    );
}