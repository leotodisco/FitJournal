import React from "react";
import "../style/workoutCard.css";


class WorkoutCard extends React.Component {
    render() {
        return (
            <div className="workout-card-container">
            <h2>Day {this.props.index + 1}</h2>
            {this.props.day.exercises.map(ex => (
            <>
                <div className="esercizio">
                    <h2 className="nome-esercizio">{ex.name}</h2>
                    <div className="statistiche-esercizio">
                        <span><b>{ex.sets}</b> Sets</span>
                        <span><b>{ex.reps}</b> Reps</span>
                        <span><b>{ex.weight}</b> kg</span>
                    </div>
                </div><hr className="divider-esercizi"></hr>
                </>      
            )
            )}

                             
            </div>
        );
    };
}

export default WorkoutCard;