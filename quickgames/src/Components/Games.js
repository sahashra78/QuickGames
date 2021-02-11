import React from 'react';
import {Link} from 'react-router-dom'
import { games } from './Images.js';

function Games() {
    return (
        <>
        <h1 className="textCenter textExtraLarge">GAMES</h1>
        <div className="gameCollection wrapper">
            <div className="gameContainer">
                <img src={games.RockPaperScissor} alt="Rock Paper Scissor" />
                <div className="gameInfo">
                    <h6>Rock Paper Scissor</h6>
                    <Link to="/RockPaperScissor" className="rounded_btn">Play</Link>
                </div>
            </div>
            <div className="gameContainer">
                <img src={games.MathGenius} alt="Math Genius" />
                <div className="gameInfo">
                    <h6>Multiplication Quiz</h6>
                    <Link to="/MathGenius" className="rounded_btn">Play</Link>
                </div>
            </div>
            <div className="gameContainer">
                <img src={games.TicTacToe} alt="Tic Tac Toe" />
                <div className="gameInfo">
                    <h6>Tic Tac Toe</h6>
                    <Link to="/TicTacToe" className="rounded_btn">Play</Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default Games
