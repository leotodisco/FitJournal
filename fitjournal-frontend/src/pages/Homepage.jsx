import React, { useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserProvider'; 
import WorkoutCard from '../components/WorkoutCard'; 
import "../style/homepageStyle.css";

const Homepage = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate(); 
    const apiUrl = "http://127.0.0.1:3011/workout/findWorkout";
    const [workoutPlan, setWorkoutPlan] = useState({});
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

        if (user) {
            findWorkout();
        } else {
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

    const findWorkout = async () => {
        setLoading(true);
        setError('');

        try {
            if (!user || !user.currentWorkoutPlan) {
                throw new Error('Dati utente mancanti');
            }

            const tokenCookie = getCookie('authToken');
            if (!tokenCookie) {
                throw new Error('Token di autorizzazione mancante');
            }

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenCookie}`
                },
                body: JSON.stringify({ workoutID: user.currentWorkoutPlan }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Errore in fetch workout');
            }

            const data = await response.json();
            console.log('Dati ottenuti:', data.workout); // Log dei dati ottenuti
            setWorkoutPlan(data.workout);
        } catch (err) {
            console.error('Errore nella fetch:', err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return null;
    }


    return (
        <div className='home-container'>
            <div className='titolo-home-page'>
                <h2>I tuoi allenamenti 💪🏻</h2>
            </div>

            <div className='workout-container'>
            {!workoutPlan || !workoutPlan.days || workoutPlan.days.length === 0 ? 
                (
                    <p>Loading...</p>
                ) : 
                (
                    workoutPlan.days.map((day, index) => (
                        <>
                        <WorkoutCard day={day} index={index} idPianoDiAllenamento={workoutPlan._id} />
                        </>
                    ))
                )
            }
            </div>
            
        </div>
    );
}

export default Homepage;