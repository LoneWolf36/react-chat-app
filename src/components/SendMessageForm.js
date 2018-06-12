import React from 'react'

class SendMessageForm extends React.Component {
    constructor() {
        super()
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            text: ''
        }
    }
    onChange(e) {
        this.setState({ message: e.target.value, })
    }
    onSubmit(e) {
        e.preventDefault()
        this.props.onSubmit(this.state.text)
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder="Type a message..." onChange={this.onChange} />
                    <input type="button" value="Send" />
                </form>
            </div>
        )
    }
}

export default SendMessageForm