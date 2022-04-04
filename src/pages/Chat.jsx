import { auth } from "../services/firebase";
import { db } from "../services/firebase"
import React, { Component, useEffect, useState } from 'react';
function Chat() {
  const [state, setState] = useState({
        user: auth().currentUser,
        chats: [],
        content: '',
        readError: null,
        writeError: null
        });
    
    
      const handleChange = (e) => {
        setState({
          content: e.target.value
        });
      }
      const handleSubmit = async (e) => {
        e.preventDefault();
        setState({ writeError: null });
        try {
          await db.ref("chats").push({
            content: state.content,
            timestamp: Date.now(),
            uid: state.user.uid
          });
          setState({ content: '' });
        } catch (error) {
          setState({ writeError: error.message });
        }
      }
      useEffect(() => {
      setState({ readError: null });
      try {
        db.ref("chats").on("value", snapshot => {
          let chats = [];
          snapshot.forEach((snap) => {
            chats.push(snap.val());
          });
          setState({ chats });
        });
      } catch (error) {
        setState({ readError: error.message });
      }
    }, []);
    return ( <div>
              <div className="chats">
                {state.chats.map(chat => {
                  return <p key={chat.timestamp}>{chat.content}</p>
                })}
              </div>
              {}
              <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={state.content}></input>
                {state.error ? <p>{state.writeError}</p> : null}
                <button type="submit">Send</button>
              </form>
              <div>
                Login in as: <strong>{state.user.email}</strong>
              </div>
            </div>
          );
      }
  
      export default Chat;