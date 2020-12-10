import React, { useState } from "react";

const Game = () => {
    const initialState = Array(9).fill(null);

    const [state, setState] = useState(initialState);
    const [turnX, setTurnX] = useState(true);
    const [howGameFinished, setHowGameFinished] = useState(null);
    const [winner, setWinner] = useState(null);

    const combinationsForWin = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const isWin = (arr) => {
        let win = false;
        const symbol = turnX ? "X" : "0";

        combinationsForWin.forEach((item) => {
            if (
                arr[item[0]] === symbol &&
                arr[item[1]] === symbol &&
                arr[item[2]] === symbol
            ) {
                setWinner(symbol);
                setHowGameFinished("win");
                win = true;
            }
        });

        return win;
    };

    const squareClick = (id) => {
        console.log(state);
        if (!state[id]) {
            let newState = [...state];
            if (turnX) {
                newState[id] = "X";
                setTurnX(false);
            } else {
                newState[id] = "0";
                setTurnX(true);
            }
            setState(newState);

            const emptySquares = newState.filter((i) => !i).length;

            if (emptySquares < 5) {
                let isWin1 = isWin(newState);

                if (emptySquares === 0 && !isWin1) {
                    debugger;
                    setHowGameFinished("draw");
                }
            }
        }
    };

    const newGame = () => {
        setState(initialState);
        setTurnX(true);
        setHowGameFinished(null);
        setWinner(null);
    };

    if (howGameFinished === "win") {
        return <NewGame winnerText={`${winner} победил`} newGame={newGame} />;
    } else if (howGameFinished === "draw") {
        return <NewGame winnerText={"Ничья"} newGame={newGame} />;
    }
    return (
        <div className="game-wrapper">
            <div className="turn">Очередь: {turnX ? "X" : "0"}</div>
            <div className="game">
                {[...state].map((v, i) => {
                    return (
                        <Square
                            key={i}
                            id={i}
                            squareClick={squareClick}
                            state={state}
                        />
                    );
                })}
            </div>
        </div>
    );
};

const Square = (props) => {
    return (
        <div
            className="square"
            onClick={() => {
                props.squareClick(props.id);
            }}
        >
            {props.state[props.id]}
        </div>
    );
};

const NewGame = (props) => {
    return (
        <div className="new-game-wrapper">
            <div className="winner-text">{props.winnerText}</div>
            <div className="new-game" onClick={props.newGame}>
                Начать новую игру
            </div>
        </div>
    );
};

export default Game;
