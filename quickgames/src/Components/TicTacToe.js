import React, { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function TicTacToe() {
    const [popUp, setPopUp] = useState(false);
    const [xTurn, changeTurn] = useReducer(
        (xTurn) => !xTurn, true
    );
    const [winner, setWinner] = useState(null);
    const [board, setBoard] = useState(Array(9).fill(null));
    const checkWinner = () => {
        let winLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < winLines.length; i++) {
            const [a, b, c] = winLines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setWinner(board[a]);
                return;
            }
        }
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                return;
            }
            if (i === 8 && winner === null) {
                setWinner("DRAW");
            }
        }
    }
    const handleClick = (index) => {
        let newBoard = [...board];
        if (newBoard[index] === null && winner === null) {
            newBoard[index] = (xTurn) ? "X" : "O";
            setBoard(newBoard);
            changeTurn();
        }
    }
    const resetGame = () => {
        let newBoard = Array(9).fill(null);
        setBoard(newBoard);
        setWinner(null);
    }
    useEffect(() => {
        checkWinner();
        // eslint-disable-next-line
    }, [handleClick]);


    const Box = board.map((box, index) => (<button key={index} onClick={() => handleClick(index)}>{box}</button>));

    return (
        <>
            <div className="gameWindow wrapper textWhite">
                <div>
                    <Link to="/" className="backButton textExtraLarge">
                        <span><FontAwesomeIcon icon="chevron-left" size="1x" /></span> <span className="textMedium">BACK</span>
                    </Link>
                    <h1 className="textCenter textExtraLarge"> Tic Tac Toe </h1>
                    <span className="textSmall showInfo"><FontAwesomeIcon icon="info-circle" size="1x" onClick={() => setPopUp(true)} /></span>
                    <div className="ticTacToeContainer wrapper">
                        {Box}
                        <div style={{ display: winner ? "block" : "none" }}>
                            <div className="ticTacToeResetButton textCenter" onClick={() => resetGame()}>{(winner === "DRAW") ? (<><h1>XO</h1> <h4>{winner} !</h4> <p>Click to Play!</p></>) : (winner === "X" || "O") ? (<><h1>{winner}</h1> <h4>WINNER !</h4> <p>Click to Play!</p></>) : null}</div>
                        </div>
                        {(!winner) ? <h6 className="textCenter textSmall showTurn">TURN : {(xTurn) ? "X" : "O"}</h6> : null}
                    </div>
                </div>
            </div>
            <div style={{ display: popUp ? "block" : "none" }} className="popUpContainer" id="ticTacToe">
                <span onClick={() => setPopUp(false)} className="close"><FontAwesomeIcon icon="times" size="1x" /></span>
                <h2 className="textCenter">How To Play</h2>
                <p>Players take turns placing their Mark, X or O, on an open square in the grid. The first player to make 3 of their own mark in a row vertically, horizontally, or diagonally wins the game.
                    If all 9 squares are filled and neither player has 3 in a row, the game is considered a Tie.</p>
                <ul>
                    <li>Press a square to place your mark.</li>
                    <li>Make three in a row horizontally, vertically, or diagonally to win</li>
                    <li>Watch your opponent and block them if they get 2 in a row</li>
                </ul>
            </div>
        </>
    )
}

export default TicTacToe
