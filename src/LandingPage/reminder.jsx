import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import NavBar from '../General/navbar';
import './reminder.css';

function Reminder() {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState('');

  useEffect(() => {
    
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await fetch('/api/reminders');
      const data = await response.json();
      setReminders(data);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  const addReminder = async () => {
    try {
      const response = await fetch('/api/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newReminder }),
      });

      
      setNewReminder('');
      fetchReminders();

      
      if (response.ok) {
        const addedReminder = await response.json();

        // para que aparezca el reminder en la pantalla --> no funciona nose pq
        setReminders([...reminders, addedReminder]);
      } else {
        console.error('Error adding reminder:', response.status);
      }
    } catch (error) {
      console.error('Error adding reminder:', error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="App">
        <h1>Reminders</h1>
        <ul>
          {reminders.map((reminder) => (
            <li key={reminder.id} style={{ margin: '5px', color: 'black' }}>{reminder.text}</li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
          />
          <Button onClick={addReminder}>Agregar Reminder</Button>
        </div>
      </div>
    </>
  );
}

export default Reminder;

