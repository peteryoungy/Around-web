import React, {useState} from 'react';
import logo from "../assets/images/logo.svg";


function TopBar(props) {

    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />

            <span className="App-title">
                Around Web
            </span>
        </header>
    );
};

export default TopBar;