import React from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'

class ChatScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            messages: []
        }
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
                return currentUser.subscribeToRoom({
                    roomId: 9259313,
                    messageLimit: 100,
                    hooks: {
                        onNewMessage: message => {
                            this.setState({ messages: [...this.state.messages, message],
                            })
                        }
                    }
                })
            })
            .then(currentRoom => {})
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <MessageList messages={this.state.messages} />
                <SendMessageForm onSubmit={text => alert(text)} />
            </div>
        )
    }
}

export default ChatScreen