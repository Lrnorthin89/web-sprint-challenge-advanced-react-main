// ❗ OPTIONAL, not required to pass the sprint
// ❗ OPTIONAL, not required to pass the sprint
// ❗ OPTIONAL, not required to pass the sprint
import React from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  state = initialState

  getXY = () => {
    const { index } = this.state;
    const size = 3;
    const row = Math.floor(index / size);
    const col = index % size;
    return { row, col };
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  getXYMessage = () => {
    const { row, col } = this.getXY();
    return `Coordinates (${row + 1}, ${col + 1})`;
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  reset = () => {
    this.setState (initialState)
    // Use this helper to reset all states to their initial values.
  }

  getNextIndex = (direction) => {
    const { index } = this.state;
    const size = 3;
    let newIndex = index;

    switch (direction) {
      case 'left':
        if (index % size !== 0) newIndex = index - 1;
        break;
      case 'up':
        if (index >= size)  newIndex = index - size;
        break;
      case 'right':
        if (index % size !== size - 1)  newIndex = index + 1;
        break;
      case 'down':
       if (index < (size - 1) * size) newIndex = index + size;
        break;
      default:
        break;
    }

    return newIndex;
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  move = (evt) => {
    const direction = evt.target.id;
    this.setState(prevState => ({
      index: this.getNextIndex(direction),
      steps: prevState.steps + 1,
      message: this.getXYMessage()
    }));
  }
  

  onChange = (evt) => {
    this.setState({ email: evt.target.value });
  }
  

  onSubmit = (evt) => {
    evt.preventDefault(); // Prevent page refresh on submit
    const { email } = this.state;
  
    fetch('/your-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Handle success (e.g., show a success message)
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    });
  }
  

  render() {
    const { index, steps, message } = this.state;
    const { className } = this.props;
  
    return (
      <div id="wrapper" className={className}>
        <p>(This component is not required to pass the sprint)</p>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {steps} times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
                {idx === index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>RESET</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange} />
          <input id="submit" type="submit" value="Submit" />
        </form>
      </div>
    );
  }  
}
