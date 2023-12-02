import React from 'react';
import './PopupEvent.css';

function PopupEvent(props) {
  const handleCancel = () => {
    props.setTrigger(false);
    if (props.setIsEditMode) {
      props.setIsEditMode(false);
      // Reset the event details only when in edit mode
      props.setEventDetails({
        name: '',
        desc: '',
        date: new Date(),
        place: '',
        guests: '',
        calendarId: '',
      });
    }
    // Close the edit pop-up
    if (props.setShowPopupEvent) {
      props.setShowPopupEvent(false);
    }
  };
  
  return props.trigger ? (
    <div className='popup'>
      <div className="popup-inner">
        <button className="close-btn" onClick={handleCancel}>Close</button>
        {props.children}
      </div>
    </div>
  ) : null;
}

export default PopupEvent;
