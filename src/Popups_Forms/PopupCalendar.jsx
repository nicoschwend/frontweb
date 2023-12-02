import React from 'react'
import './PopupCalendar.css'

function PopupCalendar(props) {
  const handleCancel = () => {
    props.setTrigger(false);
    if (props.setIsEditMode) {
      props.setIsEditMode(false);
      // Reset the calendar details only when in edit mode
      props.setCalendarDetails({
        theme: '',
        userId: '',
      });
    }
    // Close the edit pop-up
    if (props.setShowPopupCalendar) {
      props.setShowPopupCalendar(false);
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

export default PopupCalendar