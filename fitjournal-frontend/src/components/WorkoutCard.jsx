import React, {useState} from "react";
import "../style/workoutCard.css";



class WorkoutCard extends React.Component {
    handleModifica = async (idEsercizio, nuovoPeso) => {
        console.log(this.props.idPianoDiAllenamento);   

    }

    render() {
        return (
            <div className="workout-card-container">
            <h2>Giorno{this.props.index + 1} 🗓️</h2>
            {this.props.day.exercises.map(ex => (
            <>
                <div className="esercizio">
                    <h2 className="nome-esercizio"> {ex.name.length > 20 ? `${ex.name.slice(0, 20)}...` : ex.name}</h2>
                    <div className="statistiche-esercizio">
                        <span><b>{ex.sets}</b> Sets</span>
                        <span><b>{ex.reps}</b> Reps</span>
                        <span><b>{ex.weight}</b> kg</span>
                    </div>
                    <div>
                        <span onClick={() => this.handleModifica(ex._id)}>
                            {/** Quanod clicco dovrei avere una modale che mi fa selezionare il nuovo peso */}
                            <b>Modifica ✍🏻</b>
                        </span>
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