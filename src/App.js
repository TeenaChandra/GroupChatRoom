import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useEffect, useState } from 'react';
import { SignInPage } from './SignInPage';
import { GroupChatRoom } from './GroupChatRoom';
import './css/App.css';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "chatapp-9cee6.firebaseapp.com",
  projectId: "chatapp-9cee6",
  storageBucket: "chatapp-9cee6.appspot.com",
  messagingSenderId: "261514016057",
  appId: "1:261514016057:web:4f0338a2981717e3fe24e8"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function App() {

  const [currentUser, setCurrentUser] = useState(() => auth.currentUser);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const unsubscribeToAuthStateChanges = firebase.auth().onAuthStateChanged(user => {
      if(user){
        setCurrentUser(user);
      }else{
        setCurrentUser(false);
      }
      if(isLoading){
        setIsLoading(false);
      }
      
    })
    return unsubscribeToAuthStateChanges;
  },[isLoading])

  return (
    <div className="App">
      {
        currentUser ?(<GroupChatRoom  currentUser={currentUser}/>):  <SignInPage firebase={firebase} />
      }
    </div>
  );
}

export default App;
