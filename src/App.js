import React from 'react';
import './App.css';
import { Component } from 'react';

const data = require('./editThis.json');

class App extends Component {
  state = {
    currentQuestion: {},
    history : ["100"]
  }

  componentDidMount(){
    this.setState({currentQuestion: data[100]});
  }

  onOptionClick = (event) => {
    const next = event.target.value;
    this.appendToHistory(next);
    this.setState({currentQuestion: data[next]})
  }

  appendToHistory = (optionID) => {
    this.state.history.push(optionID);
  }

  goBack = () => {
    const {history} = this.state;
    history.pop();
    const previousQuestion = history[history.length-1];
    this.setState({currentQuestion: data[previousQuestion]});
  }

  render(){
    const { currentQuestion, history } = this.state; 

    return (
      <div className="App">
        <h1>Smart suggestor</h1>
        <div id="currentQuestion">
          <h2>{currentQuestion.heading}</h2>
          <div id="options">
            {
              /* If there are sub questions */
              currentQuestion.options ? 
              currentQuestion.options.map((option, index) => (
                <button 
                  value={option.next}
                  key={index}
                  onClick={this.onOptionClick}
                >{option.value}
                </button>
              ))
              :
              <p>{currentQuestion.description}</p>
            }
          </div>
          {
            history.length > 1 ?
            <button onClick={this.goBack}>Go back</button>
            : null
          }
        </div>
      </div>
    );
  }
}

export default App;
