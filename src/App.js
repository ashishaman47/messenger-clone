import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import db from './firebase';
import Message from './Message';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {
  // useState is a variable in the react
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  console.log(messages);

  useEffect(() => {
    //run once wheen the app component loads
    // any change occurs in DB run this code
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  // useEffect is block of code which runs based on condition which is used to run once when the component load in our case (App Component)
  useEffect(() => {
    //run code here...
    setUsername(prompt('Pleae enter your name'));
  }, []); //condition

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // all the logic to send the message
    // adding input to the end of all the messages
    setInput('');
  };

  return (
    <div className='App'>
      <img
        src='https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100'
        alt=''
      />
      <h1>Hello!!</h1>
      <h2>Welcome {username}</h2>

      {/* Input Field */}
      {/* Button */}
      <form className='app__form'>
        {/* to send the msg on pressing enter key -- put input and button inside form */}

        <FormControl className='app__formControl'>
          <InputLabel>Enter a message...</InputLabel>
          <Input
            className='app__input'
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className='app__iconButton'
            // allow us to don't send empty msg
            disabled={!input}
            variant='contained'
            color='primary'
            type='submit'
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
          {/* on pressing enter it tends to refresh so we need to prevent refresh in sendMessage */}
        </FormControl>
      </form>

      {/* Message Themselves */}

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
