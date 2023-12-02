import React, {useState} from "react";
import { render } from "react-dom";
import Calendar from "react-calendar";
import NavBar from "./navbar";
import axios from "axios";
import PopupEvent from "../Popups_Forms/PopupEvent";
import PopupTask from "../Popups_Forms/PopupTask";
import PopupCalendar from "../Popups_Forms/PopupCalendar";

function NewCalendario() {
    const [date, setDate] = useState(new Date());
    const [isEditMode, setIsEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    function handleBooking (details, setDetails, isEditMode, setEditMode, editIndex, setEditIndex, bookedItems, setBookedItems, url) 
    {
        if (!details.name.trim() || !details.desc.trim() || !details.date) {
            alert('Por favor ingrese todos los detalles requeridos.');
            return;
          }
        
        const newItem = {
            ...(details.hasOwnProperty('name') && { name: details.name }),
            ...(details.hasOwnProperty('desc') && { desc: details.desc }),
            ...(details.hasOwnProperty('date') && { date: details.date }),
            ...(details.hasOwnProperty('priority') && { priority: details.priority }),
            ...(details.hasOwnProperty('place') && { place: details.place }),
            ...(details.hasOwnProperty('guests') && { guests: details.guests }),
            ...(details.hasOwnProperty('calendarId') && { calendarId: details.calendarId }),
            ...(details.hasOwnProperty('goalId') && { goalId: details.goalId }),
            ...(details.hasOwnProperty('theme') && { theme: details.theme }),
            ...(details.hasOwnProperty('userId') && { userId: details.userId }),
        };

        if (isEditMode) {
            const updatedItems = bookedItems.slice();
            updatedItems[editIndex] = newItem;
            setBookedItems(updatedItems);
            setEditMode(false);
            setEditIndex(null);
        } else {
            const updatedItems = bookedItems.slice();
            updatedItems.push(newItem);
            setBookedItems(updatedItems);
        }

        setDetails({
            name: '',
            desc: '',
            date: new Date(),
            priority: '',
            place: '',
            guests: '',
            calendarId: '',
            goalId: '',
            theme: '',
            userId: '',
        });

        axios.post(url, newItem)
            .then(response => {
                console.log(response);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    function handleDelete (index, bookedItems, setBookedItems, url) 
    {
        const updatedItems = bookedItems.slice();
        updatedItems.splice(index, 1);
        setBookedItems(updatedItems);

        axios.delete(url)
            .then(response => {
                console.log(response);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    function handleEdit (index, bookedItems, setBookedItems, setDetails, setEditMode, setEditIndex, url) 
    {
        const item = bookedItems[index];
        setDetails({
            name: item.name,
            desc: item.desc,
            date: item.date,
            priority: item.priority,
            place: item.place,
            guests: item.guests,
            calendarId: item.calendarId,
            goalId: item.goalId,
            theme: item.theme,
            userId: item.userId,
        });
        setEditMode(true);
        setEditIndex(index);
        axios.put(url)
            .then(response => {
                console.log(response);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div>
            <NavBar />
            <Calendar
                onChange={setDate}
                value={date}
            />
            <PopupCalendar />
        </div>
    );
}