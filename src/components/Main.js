import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

function Main(props) {
    const { isLoggedIn, handleLoggedIn } = props;

    const showLogin = () => {
        // case1: logged in -> display home PAGE
        // case2: not logged in -> display login page
        return isLoggedIn ? (
            <Redirect to="/home" />
        ) : (
            <Login handleLoggedIn={handleLoggedIn} />
        );
    };

    const showHome = () => {
        // case1: loggedIn -> display home page
        // case2: not loggedin - > display login page
        return isLoggedIn ? <Home /> : <Redirect to="/login" />;
    };

    return (
        <div className="main">
            <Switch>
                <Route path="/" exact render={showLogin} />
                <Route path="/login" render={showLogin} />
                <Route path="/register" component={Register} />
                <Route path="/home" render={showHome} />
            </Switch>
        </div>
    );
}

export default Main;
