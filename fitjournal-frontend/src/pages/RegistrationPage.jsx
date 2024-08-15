import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/loginStyle.css"


const RegistrationPage = () => {
    const apiUrl = "http://127.0.0.1:3011/auth/signin";
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [bodyWeight, setBodyWeight] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try{
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({ email: email, 
                                       password: password, 
                                       name: name, 
                                       surname: surname, 
                                       bodyWeight: bodyWeight }),
                credentials: 'include'
            })

            if (!response.ok) {
                throw new Error('Errore nella registrazione');
            }

            const data = await response.json();
            setLoading(false);
            navigate('/login'); 
        } catch(err) {
            setLoading(false);
            setError(error.message);
        }
    }

    return(
        <div className='login-container'>
            <div className='left-side-login-page'>
                <h1>FitJournal</h1>
                <h2>Track. Progress. Conquer.</h2>
            </div>

            <div className='right-side-login-page'>
                <div className='name-container'>
                    <input type="text" className='fitJournalInput' placeholder="Nome" onChange={(e) => setName(e.target.value)}/>
                    <input type="text" className='fitJournalInput' placeholder="Cognome" onChange={(e) => setSurname(e.target.value)}/>
                </div>

                <input type="text" className='fitJournalInput' placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" className='fitJournalInput' placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>

                <button className='login-submit-button' onClick={handleSubmit}>Registrati</button>
            </div>
        </div>
    );
}

export default RegistrationPage;