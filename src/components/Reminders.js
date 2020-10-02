import React, { Component } from "react";
import axios from "axios";
import Reminder from "./Reminder";
import "./Reminders.css";

export default class Reminders extends Component {
  constructor(props) {
    super(props);
    this.getReminders();
    this.state = {
      reminders: [],
      formData: {},
    };
  }

  getReminders = async () => {
    await axios
      .get("http://localhost:3000/reminders/")
      .then((response) => {
        this.setState({ reminders: response.data });
      })
      .catch((error) => console.log(error));
  };

  handleChange = (e) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value,
      },
    });
    console.log("formData - Change -", this.state.formData);
  };

  addReminder = async (e) => {
    e.preventDefault();
    const res = await axios
      .post("http://localhost:3000/reminders/", this.state.formData)
      .catch((error) => console.log(error));
    if (res) {
      this.getReminders();
    }
  };
  deleteReminder = async (id) => {
    await axios
      .delete(`http://localhost:3000/reminders/${id}`)
      .catch((error) => console.log(error));
    this.getReminders();
  };

  render() {
    const noReminders =
      !this.state.reminders ||
      (this.state.reminders && this.state.reminders.length === 0);
    return (
      <div>
        {noReminders && <h2>No Reminders</h2>}
        {this.state.reminders.map((reminder, index) => (
          <Reminder key={index} {...reminder} onDelete={this.deleteReminder} />
        ))}
        <br />
        <h3>Add Reminder</h3>
        <form onSubmit={this.addReminder}>
          <label htmlFor="id">Id</label>
          <input
            type="text"
            name="id"
            placeholder="Id"
            onChange={this.handleChange}
          />
          <label htmlFor="reminder">Reminder</label>
          <input
            type="text"
            name="reminder"
            placeholder="Reminder"
            onChange={this.handleChange}
          />
          <label htmlFor="time">Time</label>
          <input
            type="text"
            name="time"
            placeholder="Time"
            onChange={this.handleChange}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}
