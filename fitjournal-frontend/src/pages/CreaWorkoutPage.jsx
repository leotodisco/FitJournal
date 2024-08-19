import React, { useContext, useEffect, useState} from 'react';
import { UserContext } from '../components/UserProvider'; 
import { useNavigate } from 'react-router-dom';
import "../style/CreaWorkoutPageStyle.css"

const CreaWorkoutPage = () => {


    return(
        <div className='crea-workout-page-container'>
            <div className='titolo-home-page'>
                <h2>Tieniti in forma 💪🏻</h2>
            </div>

            <div className='workout-container'>

            </div>
        </div>
    );
}

export default CreaWorkoutPage;