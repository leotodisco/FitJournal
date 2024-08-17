import React, { useContext, useEffect, useState} from 'react';
import { UserContext } from '../components/UserProvider'; 
import { useNavigate } from 'react-router-dom';
import "../style/profilepageStyle.css";

const ProfilePage = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate(); 
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };
    
    useEffect(() => {
        setLoading(true);
        setError('');

        if (!user){
            const userCookie = getCookie('user');
            if (userCookie) {
                try {
                    const parsedUser = JSON.parse(decodeURIComponent(userCookie));
                    setUser(parsedUser);
                } catch (error) {
                    console.error('Errore durante il parsing del cookie utente', error);
                    navigate("/login");
                }
            } else {
                navigate("/login");
            }
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    return(
        <div className='profile-page-container'>
            <div className='titolo-profile-page'>
                <h2>Ciao, {user.name} 🤙🏻</h2>
            </div>
        </div>
    );
}

export default ProfilePage;
