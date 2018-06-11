import React, { Component } from 'react'
import UsernameForm from './components/UsernameForm'
import ChatScreen from './components/ChatScreen'
class App extends Component {
  constructor() {
    super()
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
  }
  onUsernameSubmitted(username) {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    }).then(response => {
      console.log('Success!');
    }).catch(error => {
      console.log(error)
    })
  }
  render() {
    return <UsernameForm onSubmit={this.onUsernameSubmitted} />
  }
}

export default App
