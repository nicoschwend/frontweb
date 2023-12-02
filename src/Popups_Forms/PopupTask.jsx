import React from 'react'
import './PopupTask.css'

function PopupTask(props) {
  const handleCancel = () => {
    props.setTrigger(false);
    if (props.setIsEditMode) {
      props.setIsEditMode(false);
      // Reset the task details only when in edit mode
      props.setTaskDetails({
        name: '',
        desc: '',
        date: new Date(),
        priority: '',
        calendarId: '',
        goalId: '',
      });
    }
    // Close the edit pop-up
    if (props.setShowPopupTask) {
      props.setShowPopupTask(false);
    }
  }
  return props.trigger ? (
    <div className='popup'>
      <div className="popup-inner">
        <button className="close-btn" onClick={handleCancel}>Close</button>
        {props.children}
      </div>
    </div>
  ) : null;
}

export default PopupTask