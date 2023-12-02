import React, { useState } from 'react';
import NavBar from '../General/navbar';
import './notification.css';

function Notification() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    time: '',
    event: '',
    task: '',
  });

  const handleChange = (e) => { const { name, value } = e.target; setFormData({...formData, [name]: value,});};

  const handleSubmit = (e) => {e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <>
      <NavBar />
      <div className="Notification">
        <h1>Notificaciones</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange}/>
          </label>
          <br />
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange}/>
          </label>
          <br />
          <label>
            Time:
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Event:
            <input
              type="text"
              name="event"
              value={formData.event}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Task:
            <input
              type="text"
              name="task"
              value={formData.task}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Notification;

