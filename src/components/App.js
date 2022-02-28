import React, {useState} from "react";
import TopBar from "./TopBar";
import {TOKEN_KEY} from "../constants";
import Main from "./Main.js"

function App() {

    // note: useState?
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem(TOKEN_KEY) ? true : false
    );

    // define cb for isLoggedIn
    const loggedIn = (token) => {
        if(token){
            localStorage.setItem(TOKEN_KEY, token)
            setIsLoggedIn(true)
        }
    }

    const logout = () => {
        console.log('log out')
        localStorage.removeItem(TOKEN_KEY)
        setIsLoggedIn(false)
    }
    return (
        <div className="App">
            <TopBar isLoggedIn={isLoggedIn} handleLogout={logout}/>
            <Main handleLoggedIn={loggedIn} isLoggedIn={isLoggedIn} />
        </div>
    );
}

export default App;
