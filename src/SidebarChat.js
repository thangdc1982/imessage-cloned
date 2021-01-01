import React, { useEffect, useState } from 'react';
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setChat } from './features/chatSlice';
import db from './firebase';
import * as timeago from 'timeago.js';

function SidebarChat({id, chatName}) {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState(null);

  /**
   * Update when id change
   */
  useEffect(() => {
    
    db.collection('chat').doc(id)
      .collection('messages')
      .orderBy('timestamp', 'decs')
      .onSnapshot((snapshot) => (
        setChatInfo(snapshot.docs.map(doc => doc.data())))        
      )
  }, [id]);

  return (
    <div className="sidebarChat" onClick={() => {
      dispatch(
        setChat({
          chatId: id,
          chatName: chatName
        })
      )
    }}>
      <Avatar src={chatInfo && chatInfo[0] && chatInfo[0].photo} />
      <div className="sidebarChat-info">
        <h3>{chatName}</h3>
        {
          chatInfo && chatInfo[0] && (
            <>
              <p>{chatInfo[0]?.message}</p>
              <small>{
                timeago.format(chatInfo[0]?.timestamp?.toDate())
              }</small>
            </>
          )
        }        
      </div>
    </div>
  )
}

export default SidebarChat;
