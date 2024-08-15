import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserProvider';
import "../style/loginStyle.css"

const LoginPage = () => {
    const apiUrl = "http://127.0.0.1:3011/auth/login";
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 
    const { setUser } = useContext(UserContext); 

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try{
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ email: email, password: password }),
                  credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Credenziali non valide');
            }

            const data = await response.json();

            // Salva il token nei cookie
            const token = data.token;
            const cookieName = 'authToken';
            document.cookie = `${cookieName}=${token}; path=/; max-age=7200; secure; samesite=Strict`;

            // Salva l'utente nei cookie
            const user = {
                name: data.user.name,
                surname: data.user.surname,
                id: data.user.id,
                email: data.user.email,
                weight: data.user.weight,
                currentWorkoutPlan: data.user.currentWorkoutPlan,
            };
            console.log("IL CURRENT WOKR ", user.currentWorkoutPlan)

            const cookieNameUser = 'user';
            document.cookie = `${cookieNameUser}=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=7200; secure; samesite=Strict`;

            // Aggiorna lo stato dell'utente nel contesto usando context api
            setUser(user);

            setLoading(false);
            navigate('/'); // vai alla home
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    
    return (
        <div className='login-container'>
            <div className='left-side-login-page'>
                <h1>FitJournal</h1>
                <h2>Track. Progress. Conquer.</h2>
            </div>

            <div className='right-side-login-page'>
                <input type="text" className='fitJournalInput' placeholder=" E-mail" onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" className='fitJournalInput' placeholder=" Password" onChange={(e) => setPassword(e.target.value)}/>
                <button className='login-submit-button' onClick={handleLogin}>Accedi</button>
                <hr className='divider'/>
                <div>
                    <span className='text-login-page'>Non hai un account? </span>
                    <span className='register-button' onClick={() => navigate("/signin")}>Registrati</span>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;