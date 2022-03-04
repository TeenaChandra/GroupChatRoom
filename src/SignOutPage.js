import React from "react";
import './css/SignOut.css'
export const SignOutPage = ({firebase}) =>{
    const signOut = async() => {
        try{
            await firebase.auth().signOut();
        }catch(error){
            console.log(error.message);
        }
    }
    return(
        <div className="signOutDiv">
        <button onClick={signOut} data-testid="signout-button">SIGN OUT</button>
        </div>
    )
}