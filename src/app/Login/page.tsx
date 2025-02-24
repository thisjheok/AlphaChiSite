'use client';
import './Login.css';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';
export default function Login() {
    const router = useRouter();
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_KEY!
    );
    const [studentNumber, setStudentNumber] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        const { data, error } = await supabase.rpc('login_user',{
            student_number_input: studentNumber,
            password_input: password,
        });
        if (error) {
            console.error('로그인 오류:', error);
        } else {
            localStorage.setItem('user_id', data[0].user_id);
            console.log('로그인 성공:', data);
            router.push('/');
        }
    };
    return (
        <div className="LoginContainer">
            <div className="LoginBox">
                <img src="/img/logo/logo.jpg" alt="logo" className="LoginLogo" />
                <div className="LoginInputContainer">
                <h1 className="LoginTitle">로그인</h1>
                    <input type="text" placeholder="아이디" className="LoginInput" value={studentNumber} onChange={(e) => setStudentNumber(e.target.value)}/>
                    <input type="password" placeholder="비밀번호" className="LoginInput" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button className="LoginButton" onClick={handleLogin}>로그인</button>
                </div>
            </div>
        </div>
    )
}