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
            const loginReturn = data[0];
            if(loginReturn.login_success == false){
                if(loginReturn.message == "학번이 존재하지 않습니다."){
                    alert("학번이 존재하지 않습니다.");
                }else if(loginReturn.message == "비밀번호가 맞지 않습니다."){
                    alert("비밀번호가 틀렸습니다.");
                }
            }else{
                localStorage.setItem('user_id', loginReturn.user_id);
                console.log('로그인 성공:', data);
                router.push('/Main');
            }
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