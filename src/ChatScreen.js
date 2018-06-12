import React from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'

class ChatScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            messages: [],
            currentUser: {},
            currentRoom: {},
            usersWhoAreTyping: [],
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.sendTypingEvent = this.sendTypingEvent.bind(this)
    }

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:f1ae7877-7bb2-4d97-bb02-d24cd63535a8',
            userId: this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'http://localhost:3001/authenticate'
            })
        })

        chatManager
            .connect()
            .then(currentUser => {
                this.setState({ currentUser })
                return currentUser.subscribeToRoom({
                    roomId: 9259313,
                    messageLimit: 100,
                    hooks: {
                        onNewMessage: message => {
                            this.setState({ messages: [...this.state.messages, message],
                            })
                        },
                        onUserStartedTyping: user => {console.log(user.name, ' started typing')},
                        onUserStoppedTyping: user => {console.log(user.name, ' stopped typing')}
                    }
                })
            })
            .then(currentRoom => {this.setState({ currentRoom })})
            .catch(error => {
                console.log(error);
            })
    }

    sendMessage(text) {
        this.state.currentUser.sendMessage({
            roomId: this.state.currentRoom.id,
            text
        })
    }

    sendTypingEvent() {
        this.state.currentUser
            .isTypingIn({roomId: this.state.currentRoom.id})
            .catch(error => console.error(error,'error'))
    }

    render() {
        return (
            <div>
                <MessageList messages={this.state.messages} />
                <SendMessageForm onSubmit={this.sendMessage} onChange={this.sendTypingEvent} />
            </div>
        )
    }
}

export default ChatScreen