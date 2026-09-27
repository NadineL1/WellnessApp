import { useState } from 'react';
import { useNavigate } from 'react-router';
import { loginWithCookies } from '../../services/auth/LoginService';
import '../../css/Auth.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await loginWithCookies(email, password);
            navigate('/dashboard');
        } catch (error) {
            console.log('User not found', error);
        }

    }

    return (
        <div className='page-container'>
            <div className='content-container'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="youremail@mail.com" required />
                    <label htmlFor='password'>Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='*********' required />
                    <button type="submit" className='submit-btn'>Login</button>
                </form>
                <a href='/register'>No account yet? Register</a>
            </div>
        </div>
    )
}