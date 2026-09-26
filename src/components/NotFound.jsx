import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function NotFound() {
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    setTimeout(() => {
        setRedirect(true);
    }, 3000);

    useEffect(() => {
        if (redirect) {
            navigate('/');
        }
    }, [redirect, navigate]);

    return (
        <div>
            <h1>404- Not found</h1>
            <p>What you're looking for does not exist.</p>
            <p>You will be redirected to the loginpage shortly.</p>
        </div>
    )
}