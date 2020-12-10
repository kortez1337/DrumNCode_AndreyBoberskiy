import React from "react";
import Game from "./components/Game/Game";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";
const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route
                    path="/start"
                    render={() => {
                        return <Start />;
                    }}
                />
                <Route
                    path="/game"
                    render={() => {
                        return <Game />;
                    }}
                />
                <Route
                    path="*"
                    render={() => {
                        return <Redirect to="/start" />;
                    }}
                />
            </Switch>
        </div>
    );
};

export const Start = (props) => {
    return (
        <div className="start">
            <NavLink to="/game">Начать игру</NavLink>
        </div>
    );
};
export default App;
