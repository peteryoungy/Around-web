import React, {useState} from "react";
import TopBar from "./TopBar";
import {TOKEN_KEY} from "../constants";

function App() {

    // note: useState?
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem(TOKEN_KEY) ? true : false
    );

    return (
        <div className="App">
            <TopBar />
        </div>
    );
}

export default App;
