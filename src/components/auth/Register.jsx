import { useState } from 'react';
import { registerUser } from '../../services/auth/RegisterService';
import '../../css/Auth.css';


export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [age, setAge] = useState("");
    const [birthday, setBirthday] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const userToAdd = { email, password, firstname, lastname, age: parseInt(age), birthday }
            await registerUser(userToAdd);
        } catch (error) {
            console.log('error creating new user', error);
        }
    }

    return (
        <div className='page-container'>
            <div className='content-container'>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email</label>
                    <input
                        type="email"
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="youremail@mail.com" required />
                    <label htmlFor='password'>Password</label>
                    <input
                        type="password"
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='*********'
                        required />
                    <label htmlFor='name'>Name</label>
                    <input
                        type="text"
                        id='name'
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        placeholder='Firstname'
                        required />
                    <label htmlFor='lastname'>Lastname</label>
                    <input
                        type="text"
                        id='lastname'
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder='Lastname'
                        required />
                    <label htmlFor='age'>Age</label>
                    <input
                        type="number"
                        id='age'
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder='Age'
                        required />
                    <label htmlFor='date'>Birthday</label>
                    <input
                        type='date'
                        id='date'
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        placeholder='Birthday'
                        required />
                    <button type="submit" className='submit-btn'>Register user</button>
                    <a href='/'>Already a member? sign in</a>
                </form>
            </div>
        </div>
    )
}