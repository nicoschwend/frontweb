// Para crear las funciones de la página principal, tales como handleEventBooking, handleEventAction, handleDeleteEvent, handleEditEvent y onChange.
// se utilizó código obtenido desde ChatGPT (autorizado en la Clase Nº0 del curso), el cual fue modificado para adaptarse a las necesidades de la página principal.
// Además de ser código adaptado a nuestro conocimiento, el cual nosotros seamos capaces de replicar, entender y explicar.
import React, { useState, useEffect, useContext } from "react";
import { render } from "react-dom";
import Calendar from "react-calendar";
import './pagprincipal.css';
import NavBar from "./navbar";
import axios from "axios";
import PopupEvent from "../Popups_Forms/PopupEvent";
import PopupTask from "../Popups_Forms/PopupTask";
import PopupCalendar from "../Popups_Forms/PopupCalendar";
import { AuthContext } from "../auth/AuthContext";
import { decodeToken } from "react-jwt";


function Pagprincipal() {
    // Generales
    const [date, setDate] = useState(new Date());
    const [isEditMode, setIsEditMode] = useState(false);
    //const {token} = useContext(AuthContext);
    //const [user_id, setUser_id] = useState('');
    //var decodedtoken = '';
    //if (token != null) { 
    //    decodedtoken = decodeToken(token);
    //    setUser_id(decodedtoken.sub);
    //} else {
    //    console.log('NO estas logeado');
//}


    // Importar eventos, tareas y calendarios desde la base de datos
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/events`)
            .then((response) => {
                setBookedEvents(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener eventos:', error);
            });

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks`)
            .then((response) => {
                setBookedTasks(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener tareas:', error);
            });
    }, []);

    // Eventos
    const [showPopupEvent, setShowPopupEvent] = useState(false);
    const [bookedEvents, setBookedEvents] = useState([]);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const [eventDetails, setEventDetails] = useState({
        name: '',
        desc: '',
        date: new Date(),
        place: '',
        guests: '',
        calendarId: '',
    });

    // Se ejecuta cuando se hace click en el boton de registrar un evento
    const handleEventBooking = () => {
        // Verificar que no haya campos vacíos
        if (!eventDetails.name.trim() || !eventDetails.desc.trim() || !eventDetails.date || !eventDetails.place.trim() || !eventDetails.guests.trim() || !eventDetails.calendarId.trim()) {
            alert('Por favor ingrese todos los detalles requeridos.');
            return;
        }
    
        const newEvent = {
            name: eventDetails.name,
            desc: eventDetails.desc,
            date: eventDetails.date.toDateString(),
            place: eventDetails.place,
            guests: eventDetails.guests,
            calendarId: eventDetails.calendarId,
        };
    
        // Verificar si se está editando un evento
        if (isEditMode) {
            // Actualizar el evento
            // Metodo slice() para copiar el arreglo de eventos y no modificar el original
            const updatedEvents = bookedEvents.slice();
            updatedEvents[editIndex] = newEvent;
            setBookedEvents(updatedEvents);
            setIsEditMode(false);
            setEditIndex(null);
          } else {
            // Agregar el evento al arreglo de eventos
            const updatedEvents = bookedEvents.slice();
            updatedEvents.push(newEvent);
            setBookedEvents(updatedEvents);
          }

        setEventDetails({
            name: '',
            desc: '',
            date: new Date(),
            place: '',
            guests: '',
            calendarId: '',
        });
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/events`, newEvent)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('Error al agregar evento:', error);
            });
        setShowPopupEvent(false);
    };   
    
    // Se ejecuta cuando se cambia la fecha del calendario
    const onChange = date => {
        setDate(date);
        setEventDetails(eventStoredDetails => {
          const updatedDetails = {
            name: eventStoredDetails.name,
            desc: eventStoredDetails.desc,
            date: date,
            place: eventStoredDetails.place,
            guests: eventStoredDetails.guests,
            calendarId: eventStoredDetails.calendarId,
          };
          return updatedDetails;
        });
    };
    
    // Se ejecuta cuando se hace click en el boton de opciones de un evento
    const handleEventAction = (index) => {
        setDeleteIndex((prevIndex) => (prevIndex === index ? null : index));
        setEditIndex(null);
    };

    // Se ejecuta cuando se hace click en el boton de eliminar un evento
    const handleDeleteEvent = (index) => {
        const updatedEvents = [...bookedEvents];
        updatedEvents.splice(index, 1);
        setBookedEvents(updatedEvents);
        setDeleteIndex(null);
        setEditIndex(null);
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/events/${index}`)
        .then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    };

    // Se ejecuta cuando se hace click en el boton de editar un evento
    const handleEditEvent = (index) => {
        const eventToEdit = bookedEvents[index];
        setEventDetails({
            name: eventToEdit.name,
            desc: eventToEdit.desc,
            date: new Date(eventToEdit.date),
            place: eventToEdit.place,
            guests: eventToEdit.guests,
            calendarId: eventToEdit.calendarId,
        });
        setEditIndex(index);
        setIsEditMode(true);
        setShowPopupEvent(true);
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/events/${index}`, eventToEdit)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('Error al editar evento:', error);
            });
    };      

    // Tareas
    const [showPopupTask, setShowPopupTask] = useState(false);
    const [bookedTasks, setBookedTasks] = useState([]);
    const [deleteIndexTask, setDeleteIndexTask] = useState(null);
    const [editIndexTask, setEditIndexTask] = useState(null);
    const [taskDetails, setTaskDetails] = useState({
        name: '',
        desc: '',
        date: new Date(),
        priority: '',
        calendarId: '',
        goalId: '',
    });

    const handleTaskBooking = () => {
        // Verificar que no haya campos vacíos
        if (!taskDetails.name.trim() || !taskDetails.desc.trim() || !taskDetails.date || !taskDetails.priority.trim() || !taskDetails.calendarId.trim() || !taskDetails.goalId.trim()) {
            alert('Por favor ingrese todos los detalles requeridos.');
            return;
        }
        const newTask = {
            name: taskDetails.name,
            desc: taskDetails.desc,
            date: taskDetails.date.toDateString(),
            priority: taskDetails.priority,
            calendarId: taskDetails.calendarId,
            goalId: taskDetails.goalId,
        };
        // Verificar si se está editando una tarea
        if (isEditMode) {
            // Actualizar la tarea
            // Metodo slice() para copiar el arreglo de tareas y no modificar el original
            const updatedTasks = bookedTasks.slice();
            updatedTasks[editIndexTask] = newTask;
            setBookedTasks(updatedTasks);
            setIsEditMode(false);
            setEditIndexTask(null);
            } else {
            // Agregar la tarea al arreglo de tareas
            const updatedTasks = bookedTasks.slice();
            updatedTasks.push(newTask);
            setBookedTasks(updatedTasks);
            }
        setTaskDetails({
            name: '',
            desc: '',
            date: new Date(),
            priority: '',
            calendarId: '',
            goalId: '',
        });
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/tasks`, newTask)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('Error al agregar evento:', error);
            });
        setShowPopupTask(false);
    };

    const onChangeTask = date => {
        setDate(date);
        setTaskDetails(taskStoredDetails => {
            const updatedDetails = {
                name: taskStoredDetails.name,
                desc: taskStoredDetails.desc,
                date: date,
                priority: taskStoredDetails.priority,
                calendarId: taskStoredDetails.calendarId,
                goalId: taskStoredDetails.goalId,
            };
            return updatedDetails;
        });
    };

    const handleTaskAction = (index) => {
        setDeleteIndexTask((prevIndex) => (prevIndex === index ? null : index));
        setEditIndexTask(null);
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = [...bookedTasks];
        updatedTasks.splice(index, 1);
        setBookedTasks(updatedTasks);
        setDeleteIndexTask(null);
        setEditIndexTask(null);
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/tasks/${index}`)
        .then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    };

    const handleEditTask = (index) => {
        const taskToEdit = bookedTasks[index];
        setTaskDetails({
            name: taskToEdit.name,
            desc: taskToEdit.desc,
            date: new Date(taskToEdit.date),
            priority: taskToEdit.priority,
            calendarId: taskToEdit.calendarId,
            goalId: taskToEdit.goalId,
        });
        setEditIndexTask(index);
        setIsEditMode(true);
        setShowPopupTask(true);
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/tasks/${index}`, taskToEdit)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('Error al editar evento:', error);
            });
    };

    // Calendarios
    const [showPopupCalendar, setShowPopupCalendar] = useState(false);
    const [bookedCalendars, setBookedCalendars] = useState([]);
    const [deleteIndexCalendar, setDeleteIndexCalendar] = useState(null);
    const [editIndexCalendar, setEditIndexCalendar] = useState(null);
    const [calendarDetails, setCalendarDetails] = useState({
        theme: '',
        userId: '',
    });

    const handleCalendarBooking = () => {
        // Verificar que no haya campos vacíos
        if (!calendarDetails.theme.trim() || !calendarDetails.userId.trim()) {
            alert('Por favor ingrese todos los detalles requeridos.');
            return;
        }
        const newCalendar = {
            theme: calendarDetails.theme,
            userId: calendarDetails.userId,
        };
        // Verificar si se está editando un calendario
        if (isEditMode) {
            // Actualizar el calendario
            // Metodo slice() para copiar el arreglo de calendarios y no modificar el original
            const updatedCalendars = bookedCalendars.slice();
            updatedCalendars[editIndexCalendar] = newCalendar;
            setBookedCalendars(updatedCalendars);
            setIsEditMode(false);
            setEditIndexCalendar(null);
            } else {
            // Agregar el calendario al arreglo de calendarios
            const updatedCalendars = bookedCalendars.slice();
            updatedCalendars.push(newCalendar);
            setBookedCalendars(updatedCalendars);
            }
        setCalendarDetails({
            theme: '',
            userId: '',
        });
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/calendars`, newCalendar)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('Error al agregar evento:', error);
            });
        setShowPopupCalendar(false);
    };

    const onChangeCalendar = date => {
        setDate(date);
        setCalendarDetails(calendarStoredDetails => {
            const updatedDetails = {
                theme: calendarStoredDetails.theme,
                userId: calendarStoredDetails.userId,
            };
            return updatedDetails;
        });
    };

    const handleCalendarAction = (index) => {
        setDeleteIndexCalendar((prevIndex) => (prevIndex === index ? null : index));
        setEditIndexCalendar(null);
    };

    const handleDeleteCalendar = (index) => {
        const updatedCalendars = [...bookedCalendars];
        updatedCalendars.splice(index, 1);
        setBookedCalendars(updatedCalendars);
        setDeleteIndexCalendar(null);
        setEditIndexCalendar(null);
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/calendars/${index}`)
        .then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    };

    const handleEditCalendar = (index) => {
        const calendarToEdit = bookedCalendars[index];
        setCalendarDetails({
            theme: calendarToEdit.theme,
            userId: calendarToEdit.userId,
        });
        setEditIndexCalendar(index);
        setIsEditMode(true);
        setShowPopupCalendar(true);
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/calendars/${index}`, calendarToEdit)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('Error al editar evento:', error);
            });
    };

    return (
        <>
            <NavBar />
            <div className='evento-container'>
                <div className='calendar-container'>
                    <Calendar onChange={onChange} value={date} minDate={new Date()} maxDate={new Date("2024-12-31")}/>
                    <button className="popup-btn" onClick={() => setShowPopupCalendar(true)} >Nuevo Calendario</button>
                    <PopupCalendar trigger={showPopupCalendar} setTrigger={setShowPopupCalendar} setIsEditMode={setIsEditMode} setCalendarDetails={setCalendarDetails}>
                        <h3>Formulario Calendario</h3>
                        <form className="evento-reserva-form">
                            <label>
                                Nombre del Calendario:
                                <input type='text' value={calendarDetails.theme} onChange={(e) => setCalendarDetails(calendarStoredDetails => ({ ...calendarStoredDetails, theme: e.target.value }))}/>
                            </label>
                            <label>
                                User ID:
                                <input type='text' value={calendarDetails.userId} onChange={(e) => setCalendarDetails(calendarStoredDetails => ({ ...calendarStoredDetails, userId: e.target.value }))}/>
                            </label>
                            <button type='button' onClick={handleCalendarBooking}> {isEditMode ? 'Actualizar' : 'Registrar'} Calendario </button>
                        </form>
                    </PopupCalendar>
                    <button className="popup-btn" onClick={() => setShowPopupEvent(true)} >Nuevo Evento</button>
                    <PopupEvent trigger={showPopupEvent} setTrigger={setShowPopupEvent}  setIsEditMode={setIsEditMode} setEventDetails={setEventDetails}>                        
                        <h3>Formulario Evento</h3>                 
                        <form className="evento-reserva-form">
                            <label>
                                Nombre del Evento:
                                <input type='text' value={eventDetails.name} onChange={(e) => setEventDetails(eventStoredDetails => ({ ...eventStoredDetails, name: e.target.value }))}/>
                            </label>
                            <label>
                                Descripción:
                                <textarea value={eventDetails.desc} onChange={(e) => setEventDetails(eventStoredDetails => ({ ...eventStoredDetails, desc: e.target.value }))}/>
                            </label>
                            <label>
                                Fecha:
                                <input type='date' value={eventDetails.date.toISOString().split('T')[0]} onChange={(e) => onChange(new Date(e.target.value))}/>
                            </label>
                            <label>
                                Lugar:
                                <textarea value={eventDetails.place} onChange={(e) => setEventDetails(eventStoredDetails => ({ ...eventStoredDetails, place: e.target.value }))}/>
                            </label>
                            <label>
                                Invitados:
                                <textarea value={eventDetails.guests} onChange={(e) => setEventDetails(eventStoredDetails => ({ ...eventStoredDetails, guests: e.target.value }))}/>
                            </label>
                            <label>
                                Calendar ID:
                                <input type='text' value={eventDetails.calendarId} onChange={(e) => setEventDetails(eventStoredDetails => ({ ...eventStoredDetails, calendarId: e.target.value }))}/>
                            </label>
                            <button type='button' onClick={handleEventBooking}>{isEditMode ? 'Actualizar' : 'Registrar'} Evento </button>
                        </form>
                    </PopupEvent>
                    <button className="popup-btn" onClick={() => setShowPopupTask(true)} >Nueva Tarea</button>
                    <PopupTask trigger={showPopupTask} setTrigger={setShowPopupTask} setIsEditMode={setIsEditMode} setTaskDetails={setTaskDetails}>
                        <h3>Formulario Tarea</h3>
                        <form className="evento-reserva-form">
                            <label>
                                Nombre de la Tarea:
                                <input type='text' value={taskDetails.name} onChange={(e) => setTaskDetails(taskStoredDetails => ({ ...taskStoredDetails, name: e.target.value }))}/>
                            </label>
                            <label>
                                Descripción:
                                <textarea value={taskDetails.desc} onChange={(e) => setTaskDetails(taskStoredDetails => ({ ...taskStoredDetails, desc: e.target.value }))}/>
                            </label>
                            <label>
                                Fecha:
                                <input type='date' value={taskDetails.date.toISOString().split('T')[0]} onChange={(e) => onChange(new Date(e.target.value))}/>
                            </label>
                            <label>
                                Prioridad:
                                <textarea value={taskDetails.priority} onChange={(e) => setTaskDetails(taskStoredDetails => ({ ...taskStoredDetails, priority: e.target.value }))}/>
                            </label>
                            <label>
                                Calendar ID:
                                <input type='text' value={taskDetails.calendarId} onChange={(e) => setTaskDetails(taskStoredDetails => ({ ...taskStoredDetails, calendarId: e.target.value }))}/>
                            </label>
                            <label>
                                Goal ID:
                                <textarea value={taskDetails.goalId} onChange={(e) => setTaskDetails(taskStoredDetails => ({ ...taskStoredDetails, goalId: e.target.value }))}/>
                            </label>
                            <button type='button' onClick={handleTaskBooking}> {isEditMode ? 'Actualizar' : 'Registrar'} Tarea</button>
                        </form>
                    </PopupTask>
                </div>
                <div className='evento-reservado-container'>
                
                    <h2>Próximos Eventos / Tareas</h2>
                    <ul>
                        {bookedEvents.map((event, index) => (
                            <li key={index}>
                                <strong>{event.name}</strong>
                                <p>{event.desc}</p>
                                <p>Fecha: {event.date}</p>
                                <p>Lugar: {event.place}</p>
                                <p>Invitados: {event.guests}</p>
                                <button className='evento-accion-btn' onClick={() => handleEventAction(index)}> </button>
                                {deleteIndex === index && !editIndex && (
                                    <>
                                        <button className='edit-btn' onClick={() => handleEditEvent(index)}> Editar </button>
                                        <button className='delete-btn' onClick={() => handleDeleteEvent(index)}> Eliminar </button>
                                    </>
                                )}
                            </li>
                        ))}
                        {bookedTasks.map((task, index) => (
                            <li key={index}>
                                <strong>{task.name}</strong>
                                <p>{task.desc}</p>
                                <p>Fecha: {task.date}</p>
                                <p>Prioridad: {task.priority}</p>
                                <button className='evento-accion-btn' onClick={() => handleTaskAction(index)}> </button>
                                {deleteIndexTask === index && !editIndexTask && (
                                    <>
                                        <button className='edit-btn' onClick={() => handleEditTask(index)}> Editar </button>
                                        <button className='delete-btn' onClick={() => handleDeleteTask(index)}> Eliminar </button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
render(<Pagprincipal />, document.getElementById("root"));

export default Pagprincipal;