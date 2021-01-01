import { IconButton } from '@material-ui/core';
import MicNoneIcon from '@material-ui/icons/MicNone';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Chat.css';
import { selectChatId, selectChatName } from './features/chatSlice';
import { selectUser } from './features/userSlice';
import db from './firebase';
import Message from './Message';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';

function Chat() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);  

  useEffect(() => {
    if (chatId) {
      // https://www.youtube.com/watch?v=HF65cySUYao&ab_channel=CleverProgrammer
      /**
       * When the user is selected from the sidebar
       * Will get the messages from the database and re-loading them back to the chat session
       */
      db.collection('chats').doc(chatId).collection('messages')
        .orderBy('timestamp', 'decs')
        .onSnapshot(snapshot => {                    
          setMessages(snapshot.docs.map(doc => {            
            return {
              id: doc.id,
              data: doc.data()
            }
        }))
        });      
    }    
  }, [chatId]);

  /**
   * Put the message to the DB   
   */
  const sendMessage = (e) => {
    e.preventDefault();    
    try {      
      db.collection('chats').doc(chatId).collection('messages')
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: input,
          uid: user.uid,
          photo: user.photo,
          email: user.email,
          displayName: user.displayName
        });
    } catch (err) {
      console.log(err.message);
    }
    setInput("");
  }

  return (
    <div className="chat">
      {/* Header */}
      <div className="chat-header">
        <h4>To: <span className="chat-name">{chatName}</span></h4>        
      </div>
      {/* Body - Messages */}
      <div className="chat-body">
        {
          messages?.map(({id, data}) => (
            <FlipMove>
              <Message key={id} contents={data} />
            </FlipMove>            
          ))
        }
      </div>
      {/* Footer - Input */}
      <div className="chat-footer">
        <form>
          <input value={input} type="text" placeholder="iMessage" 
            onChange={(e) => setInput(e.target.value)} />
          <button onClick={sendMessage}>Send Message</button>
        </form>
        <IconButton>
          <MicNoneIcon className="chat-mic" />
        </IconButton>
      </div>
    </div>
  )
}

export default Chat;