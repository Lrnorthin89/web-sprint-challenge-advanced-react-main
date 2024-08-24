import React, { useState } from 'react';
import axios from 'axios';
// Suggested initial states
const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at, corresponding to coordinates (2, 2) in a 3x3 grid.

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);

  const grid = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  function getXY() {
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    return { x, y };
  }

  function getXYMessage() {
    const { x, y } = getXY();
    return `Coordinates (${x}, ${y})`;
  }

  function reset() {
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
  }

  function getNextIndex(direction) {
    const x = index % 3;
    const y = Math.floor(index / 3);
    switch (direction) {
      case 'left':
        return x > 0 ? index - 1 : index;
      case 'right':
        return x < 2 ? index + 1 : index;
      case 'up':
        return y > 0 ? index - 3 : index;
      case 'down':
        return y < 2 ? index + 3 : index;
      default:
        return index;
    }
  }

  function move(evt) {
    const direction = evt.target.id;
    const newIndex = getNextIndex(evt.target.id);
    if (newIndex !== index) {
      setIndex(newIndex);
      setSteps(steps + 1);
      setMessage('');
    } else {
      switch (direction) {
        case 'left':
          setMessage("You can't go left");
          break;
        case 'right':
          setMessage("You can't go right");
          break;
        case 'up':
          setMessage("You can't go up");
          break;
        case 'down':
          setMessage("You can't go down");
          break;
        default:
          setMessage('invalid direction');
      }
    }
  }

  function onChange(evt) {
    const {id, value} = evt.target;
    if (id === 'email') {
      setEmail(value);
    }
  }

  function onSubmit(evt) {
    const { x, y } = getXY();
    evt.preventDefault();
    axios.post('http://localhost:9000/api/result', { email, steps, x, y })
    .then (res => {
      setEmail(initialEmail); 
      setMessage(res.data.message);

    }).catch (err => {
      setMessage(err.response.data.message);
      console.log(err);
    });
    // Add the logic to send a POST request with the email and other data if needed.
  }
  

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} {steps !== 1 ? "times" : "time"}</h3>
      </div>
      <div id="grid">
        {grid.map((idx) => (
          <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
            {idx === index ? 'B' : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={email} onChange={onChange} />
        <input id="submit" type="submit" />
      </form>
    </div>
  );
}