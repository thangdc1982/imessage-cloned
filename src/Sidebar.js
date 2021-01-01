import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import SidebarChat from './SidebarChat';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase';

function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);

  const logOut = () => {
    if (user) {
      auth.signOut();
    }
  }

  const addChat = () => {
    const chatName = prompt('Please enter a chat name');
    if (chatName) {
      db.collection('chats').add({
        chatName: chatName
      });
    }    
  };

  useEffect(() => {
    try {
      db.collection('chats').onSnapshot(snapshot => {
        setChats(snapshot.docs.map(doc => {          
          return {
            id: doc.id, 
            data: doc.data()
          }
      }))
      });
    } catch (err) {
      console.log(err.message);
    }    
  }, []);

  return (
    <div className="sidebar">      
      <div className="sidebar-header">
        <Avatar src={user.photo} className="sidebar-avatar" onClick={logOut} />
        <div className="sidebar-input">
          <SearchIcon />
          <input placeholder="Search" />
        </div>
        <IconButton variant="outlined" className="sidebar-inputButton" onClick={addChat}>
          <RateReviewOutlinedIcon />
        </IconButton>
      </div>
      <div className="sidebar-chats">
        {
          chats?.map(({id, data: {chatName}}) => (
            <SidebarChat key={id} id={id} chatName={chatName} />
          ))
        }     
      </div>
    </div>
  )
}

export default Sidebar;