import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";


function Body() {
    const [Tareas, setTareas] = useState([
        { id: 1, text: "Tarea 1", completed: false },
        { id: 2, text: "Tarea 2", completed: false },
        { id: 3, text: "Tarea 3", completed: false },
    ]);

    const handleClickChange = (TareaID) => {
        setTareas((TareaAnterior) =>
            TareaAnterior.map((Tarea) =>
                Tarea.id === TareaID ? { ...Tarea, completed: !Tarea.completed } : Tarea
            )
        );
    };

    return (
        <div className="Body">
            <div className="Columnas Columnas1">
                {/* <img className="Logo100" src="../assets/100negro.png" alt="Logo" /> */}
                <h2>Organiza tus Tareas y Actividades</h2>
                <p>
                    Un calendario digital que hará que organizar tus actividades sea una
                    experiencia emocionante y eficiente. <br /> Para empezar a
                    organizarte, solo presiona aquí
                </p>
                <button type="button">Empezar</button>
            </div>
            <div className="Columnas">
                {Tareas.map((Tarea) => (
                    <button
                        key={Tarea.id}
                        type="button"
                        className={`Tarea-button ${Tarea.completed ? 'completed' : ''}`}
                        onClick={() => handleClickChange(Tarea.id)}
                    >
                        {Tarea.text}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Body;
