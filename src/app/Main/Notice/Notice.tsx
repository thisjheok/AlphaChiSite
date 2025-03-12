'use client';
import NoticeCard from "../../Components/NoticeCard/NoticeCard";
import './Notice.css'
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

interface NoticeItem {
    title: string;
    date: string;
    content: string;
    id: number;
    writer_id: number;
}

const Notice = () => {
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
        <div className="Notice">
            <div className="NoticeHeader">
                <h1 className="Notice-title">공지사항</h1>
                <p className="Notice-more" onClick={() => router.push('/NoticeDetail')}>더보기</p>
            </div>
            <div className="Notice-preview">
                {notice.length > 0 && (
                    <>
                        <NoticeCard title={notice[0].title} date={notice[0].date} content={notice[0].content} id={notice[0].id} writer_id={notice[0].writer_id} onClick={() => router.push(`/NoticeDetail/${notice[0].id}`)}/>
                        {notice.length > 1 && <NoticeCard title={notice[1].title} date={notice[1].date} content={notice[1].content} id={notice[1].id} writer_id={notice[1].writer_id} onClick={() => router.push(`/NoticeDetail/${notice[1].id}`)}/>}
                    </>
                )}
            </div>
        </div>
    )
}

export default Notice;