import Carrusel1 from "./carrusel1";
import Carrusel2 from "./carrusel2";
import NavBar from "./navbar";
import "./instrucciones.css";
import React from "react";

function Instrucciones() {
    return (
        <>
            <NavBar />
            <div className="titulo">
                <h1>Instrucciones de Uso</h1>
            </div>
            <div className="seccion">
                <h2><span>Sección Calendario:</span></h2>
                <p><span>El calendario es el lugar principal de tu interacción con la página,
                    en está sección puedes realizar tu planificación con varios elementos,
                    los principales son eventos y tareas, los cuáles se explican a continuación.</span></p>
                <h3>Eventos:</h3>
                <p>En el caso de los eventos, tenemos el siguiente flujo:</p>
                <ol>
                    <li>Crear Evento</li>
                    <li>Llenar parámetros como fecha, lugar, duración, etc...</li>
                    <li>Invitar participantes</li>
                    <li>Publicar evento, esto envía notificiación a todos los invitados</li>
                </ol>
            </div>
            <Carrusel2 />
            <div className="seccion">
                <p>Luego es posible cancelar los eventos en caso de ser necesario, lo que remueve el evento de cada participante.</p>
                <h3>Tareas:</h3>
                <p>Las tareas son entidades puntuales y personales, es decir,
                    no se comparten con otros usuarios y están acotadas a una
                    hora específica. Pero pueden ser recurrentes en el tiempo.</p>
            </div>
            <Carrusel1 />

            <div className="seccion">
                <h2><span>Sección Metas:</span></h2>
                <p>Las metas ofrecen la oportunidad de llevar un registro
                    del progreso en el tiempo de un objetivo del usuario.</p>
                <p>En las metas no se pueden ingresar eventos, pero si tareas,
                    que serán las que se cumplan para llevar el conteo del progreso.
                    A medida que se vayan acercando al 100% se mostrará el progreso con un gráfico.
                </p>
                <h4>La vista se verá así:</h4>
                <p>Prototipo vista</p>




            </div>
            <div className="seccion">
                <h2><span>Sección Perfil:</span></h2>

                <p>Esta sección permite customizar los temas de las
                    distintas vistas, ya sea con modo oscuro u otras opciones,
                    aún está en desarrollo. Además de actualizar
                    info de usuario como contraseña y mail</p>
            </div>
        </>
    );
}

export default Instrucciones;