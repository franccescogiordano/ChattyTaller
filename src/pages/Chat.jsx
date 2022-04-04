import { auth } from "../services/firebase";
import { db } from "../services/firebase"
import { signOut } from 'firebase/auth';
import moment from 'moment'
import { onValue, push, ref } from 'firebase/database';
import React, { Component, useEffect, useState } from 'react';
function Chat() {
  const [state, setState] = useState({
        user: auth.currentUser,
        chats: [],
        content: '',
        readError: null,
        writeError: null
        });
    
    
      const handleChange = (e) => {
        setState({
          ...state,
          content: e.target.value,
        });
      }
      const handleSubmit = async (e) => {
        e.preventDefault();
        setState({...state, writeError: null });
        const newChat = {
          author: state.user.email.split('@')[0],
          content: state.content,
          timestamp: Date.now(),
          uid: state.user.uid,
        };
        try {
          await push(ref(db, 'chatty'), newChat);
          const newChats = [...state.chats, newChat];
          setState({ ...state, chats: newChats, content: '' });
        } catch (error) {
          setState({...state, writeError: error.message });
        }
      }
      useEffect(() => {
        setState({ ...state, readError: null });
      try {
        onValue(ref(db, 'chatty'), (snapshot) => {
          let chats = [];
          snapshot.forEach((snap) => {
            chats.push(snap.val());
          });
          setState({ ...state, chats });
        });
      } catch (e) {
        setState({ ...state, readError: e.message });
      }
    }, []);
    return ( <div className="divhome">
      <div>
					Login in as: <strong>{state.user.email} </strong>
					<button className="btn btn-warning" onClick={() => signOut(auth)}>Sign out</button>
				</div>
              <div className="chats">
                {state.chats.map((chat) => {
                  return (<p key={chat.timestamp}>
                  {chat.author} - {chat.content} ({moment(chat.timestamp).format('LT')})
                </p>);
                })}
              </div>
              {}
              <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={state.content}></input>
                {state.error ? <p>{state.writeError}</p> : null}
                <button  className="btn btn-primary" type="submit">Send</button>
              </form>
              <div>
                Login in as: <strong>{state.user.email}</strong>
              </div>
            </div>
          );
      }
  
      export default Chat;