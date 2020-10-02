import React from "react";
import "./Reminder.css";
import x from "./x.png";

const Reminder = (props) => {
  const { reminder, time, id, onDelete } = props;

  return (
    <div className="reminder-wrapper">
      <div className="reminder-container">
        <div className="reminder-id">{id}</div>
        <div className="reminder">{reminder}</div>
        <div className="reminder-time">{time}</div>
      </div>
      <span className="reminder-remove" onClick={() => onDelete(id)}>
        <img style={{ height: 20 }} src={x} alt="mark for delete" />
      </span>
    </div>
  );
};

export default Reminder;
