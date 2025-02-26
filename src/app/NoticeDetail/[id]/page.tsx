'use client';
import { useEffect, useState } from 'react';
import '../Notice.css';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export default function NoticeDetailPage(props:{params: {id: string}}) {
    const {id} = props.params;
    const router = useRouter();

    const [notice, setNotice] = useState<any>(null);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchNotice = async () => {
            const {data, error} = await supabase.rpc('get_notice_by_id', {notice_id_input: id});
            if (error) {
                console.error('공지사항 가져오기 오류:', error);
            } else {
                setNotice(data[0]);
            }
        }
        
        fetchNotice();
    }, []);
    

    return (
        <div className='NoticeDetailContainer'>
            <div className='NoticeDetailHeader'>
                <img src='/img/icons/back-button.svg' alt='back' className='NoticeDetailBackButton' onClick={() => router.push('/NoticeDetail')}/>
            </div>
            {notice ? (
                <div className='PostContainer'>
                    <h1 className='PostTitle'>{notice.title}</h1>
                    <div className='PostUserInfo'>
                        <img src='/img/profile.svg' alt='user' className='PostUserIcon'/>
                        <div className='PostUserInfoText'>
                            <p className='PostUserName'>{notice.writer_name}</p>
                            <p className='PostDate'>{notice.date}</p>
                        </div>
                    </div>
                    <div className='PostContent'>
                        <p className='PostContentText'>{notice.content}</p>
                    </div>
                </div>
            ) : (
                <div className='PostContainer'>
                    <p>로딩 중...</p>
                </div>
            )}
        </div>
    ); 
}