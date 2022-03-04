import React,{useState, useRef} from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { SignOutPage } from './SignOutPage';
import {  formatRelative } from 'date-fns'
import firebase from 'firebase/compat/app';
import './css/GroupChatRoom.css';
export const GroupChatRoom = ({ currentUser}) => {
    const messages = firebase.firestore().collection('messages');
    const query = messages.orderBy('createdAt').limit(30);
    const [groupMessages] = useCollectionData(query,{idField: 'id'});
    const [inputValue,setInputValue] = useState('');
    const endMessageRef = useRef(null);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const formattedDate = (message) => {
        const {createdAt} = message;
       const date =  new Date((createdAt.seconds) * 1000);
       const formattedDateIntoWords =  formatRelative(date, new Date());
       return formattedDateIntoWords.charAt(0).toUpperCase() + formattedDateIntoWords.slice(1);
    }

    const sendMessage = async(e) => {
        const { uid, photoURL, displayName } = currentUser;
        e.preventDefault();
        await messages.add({
            text: inputValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
            displayName
        })
        setInputValue('');
        endMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    return(
        <>
        <SignOutPage firebase={firebase} />
        <br/>
        <h1 className="headingDescription">Welcome to Group Chat Room</h1>
        {groupMessages && groupMessages.map(message => {
                const {createdAt} = message;
                return(<div className="message">
                <img className='userImage' src={message.photoURL} alt="profile Name:" />
                <div className="userMessageDetails">
                {message.displayName ? <span>{message.displayName} &nbsp; &nbsp;</span> : null}
                {(createdAt && createdAt.seconds) ? (<span>{formattedDate(message)}</span>) : null}
                <p key={message.id} style={{'textAlign': "left"}}>{message.text}</p>
                </div>
                </div>
                 ) }
                )
            }
            <span ref={endMessageRef} />
            <form onSubmit={sendMessage}>
                <input className="inputTextBox" type='text' value={inputValue} onChange={handleChange}></input>
                <button className="submitButton" type="submit" disabled={!inputValue}>Send Message</button>
            </form>
        </>
    )
}