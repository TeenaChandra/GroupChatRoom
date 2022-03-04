import React from "react";
export const SignInPage = ({firebase}) => {
    const googleSignIn = async() =>{
        const provider = new firebase.auth.GoogleAuthProvider();
        try{
          await firebase.auth().signInWithPopup(provider);
        } catch(error){
          console.log(error.message);
        }
      }

    return(
        <button style={{ 'height': '100px'}}onClick={googleSignIn} data-testid="click-button">Please sign in with google</button>
    )
}