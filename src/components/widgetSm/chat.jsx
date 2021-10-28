import "./widgetSm.css";
import React from "react";
import { io } from 'socket.io-client';

export default class Chat extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      send: false,
      messages: [],
      message: ''
    }
    this.onPress = this.onPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.socket = io('wss://tarea-3-websocket.2021-2.tallerdeintegracion.cl', {
      path: "/trucks",
      transports: ['websocket']
    });
    this.socket.on('CHAT', message => {
      this.setState({ messages: [message, ...this.state.messages]})
    })
  
  }

  handleSubmit = event => {  
    this.setState({ message: event.target.value})
  }

  onPress(){
    if(this.state.message!==''){
      const message = {
        message: this.state.message,
        name: this.props.operator
      }
      this.socket.emit('CHAT', message)
    }
    
  }

  render() {
    const list = this.state.messages || [];
    const messages = list.map((message, index) => {
      var d = new Date(message.date);
      d = d.toLocaleDateString();
      return (
        <div className="message" >
           <div className="name_style" >{message.name}: </div>
           <div className="message_style" >{message.message} </div>
           <div className="date_style" >{d} </div>
       </div>)
      
    });

    return(
      <div>
        <div className="widgetchat">
          {messages.reverse()}
        </div>
        <div className="submitchat">
          <input
            type="text"
            placeholder='Enter a message'
            onKeyUp={this.handleSubmit} />
          <button onClick={this.onPress}>
            Enviar
          </button>
        </div>
      </div>
    )
  }
}