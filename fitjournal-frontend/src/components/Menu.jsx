import React, {useState} from "react";
import "../style/menuStyle.css";
import {Link} from "react-router-dom";


class Menu extends React.Component {

    render() {
        return (
            <div className="container-menu">
                <h1>FitJournal</h1>

                <div className="sidebar">
                    <Link to={"/"}>
                        <div className="sidebar-option">
                            <span>Home</span>
                        </div>
                    </Link>

                    <Link to={"/creaWorkout"}>
                        <div className="sidebar-option">
                            <span>Crea Workout</span>
                        </div>
                    </Link>

                    <Link to={"/profile"}>
                        <div className="sidebar-option">
                            <span>Profilo</span>
                        </div>
                    </Link>
                  
                </div>
            </div>
        );
    }


}

export default Menu;