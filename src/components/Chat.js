import React, {useState, useEffect} from 'react';
import './Chat.css';
import queryString from 'query-string';
import io from 'socket.io-client';
import Infobar from './Infobar';
import Input from './Input.js';
import Messages from './Messages.js';
// import UsersOnline from './UsersOnline.js';

//creating a temp variable for our socket

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState ('');
  const [room, setRoom] = useState ('');
  const [users, setUsers] = useState ('');
  const [message, setMessage] = useState ('');
  const [messages, setMessages] = useState ([]);
  const ENDPOINT = 'https://the-bluechatx.herokuapp.com/';
useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  console.log (message, messages);

  return (
    <div className="containeroutside">
      <div className="container">
        <Infobar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />

      </div>

    </div>
  );
};

export default Chat;
