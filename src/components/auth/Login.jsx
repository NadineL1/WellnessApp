import { useState } from 'react';
import { loginWithCookies } from '../../services/AuthService';
import '../../css/Login.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.prevenDefault();

        await loginWithCookies(email, password);
    }

    return (
        <div className='page-container'>
            <div className='login-container'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="youremail@mail.com" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='*********' />
                    <button type="submit" className='submit-btn'>Login</button>
                </form>
            </div>
        </div>
    )
}