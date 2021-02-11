import React, { useState, useEffect, useReducer } from 'react';
import { RockPaperScissorAsset } from './Images.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function RockPaperScissor() {
    const [popUp, setPopUp] = useState(false);
    const [userChoice, setUserChoice] = useState("Rock")
    const [userScore, setUserScore] = useState(0);
    const [computerChoice, setComputerChoice] = useState("Rock")
    const [computerScore, setComputerScore] = useState(0);
    const [drawScore, setDrawScore] = useState(0);
    const [round, setRound] = useState(0);
    const [result, setResult] = useState(null);
    const [firstUpdate, toggle] = useReducer(
        (firstUpdate) => false, true
    );

    // Generating input numbers for computer
    const min = 1; const max = 3; let random;
    useEffect(() => {
        if (firstUpdate) {
            toggle();
            return;
        }
        let resultCalculator = () => {
            if (userChoice === computerChoice) {
                setResult("Draw");
                setDrawScore(drawScore + 1);
            }
            else if (userChoice === "Rock") {
                if (computerChoice === "Paper") { setResult("Computer Win!"); setComputerScore(computerScore + 1); }
                else if (computerChoice === "Scissor") { setResult("You Win!"); setUserScore(userScore + 1); }
            }
            else if (userChoice === "Paper") {
                if (computerChoice === "Scissor") { setResult("Computer Win!"); setComputerScore(computerScore + 1); }
                else if (computerChoice === "Rock") { setResult("You Win!"); setUserScore(userScore + 1); }
            }
            else if (userChoice === "Scissor") {
                if (computerChoice === "Rock") { setResult("Computer Win!"); setComputerScore(computerScore + 1); }
                else if (computerChoice === "Paper") { setResult("You Win!"); setUserScore(userScore + 1); }
            }
            return;
        }
        resultCalculator();
        // eslint-disable-next-line
    }, [computerChoice, userChoice, round])
    let inputGenerator = () => {
        random = (Math.floor(Math.random() * (max - min + 1)) + min);
        if (random === 1) {
            setComputerChoice("Rock");
        }
        else if (random === 2) {
            setComputerChoice("Paper");
        }
        else if (random === 3) {
            setComputerChoice("Scissor");
        }
        setRound(round + 1);
    }


    return (
        <>
            <div className="gameWindow wrapper textWhite">
                <div>
                    <Link to="/" className="backButton textExtraLarge">
                        <span><FontAwesomeIcon icon="chevron-left" size="1x" /></span> <span className="textMedium">BACK</span>
                    </Link>
                    <h1 className="textCenter textExtraLarge"> Rock Paper Scissor </h1>
                    <span className="textSmall showInfo"><FontAwesomeIcon icon="info-circle" size="1x" onClick={() => setPopUp(true)} /></span>
                </div>
                <p className="textCenter textBigMedium" id="roundNumber">ROUND {round + 1}</p>
                <div className="score-row textCenter textSmall">
                    <div>YOU</div>
                    <div>DRAW</div>
                    <div>RIVAL</div>
                </div>
                <div className="score-row textCenter textLarge">
                    <div>{userScore}</div>
                    <div>{drawScore}</div>
                    <div>{computerScore}</div>
                </div>
                <div className="score-row gameBoard textCenter">
                    <div>
                        <img className="selectedImage" src={(userChoice === "Rock") ? RockPaperScissorAsset.Rock : (userChoice === "Paper") ? RockPaperScissorAsset.Paper : RockPaperScissorAsset.Scissor} alt="User's Choice" />
                        <h4>{userChoice}</h4>
                        <div className="gameCollection">
                            <img src={RockPaperScissorAsset.Rock} alt="Rock" onClick={() => (setUserChoice("Rock") & inputGenerator())} />
                            <img src={RockPaperScissorAsset.Paper} alt="Rock" onClick={() => (setUserChoice("Paper") & inputGenerator())} />
                            <img src={RockPaperScissorAsset.Scissor} alt="Rock" onClick={() => (setUserChoice("Scissor") & inputGenerator())} />
                        </div>
                    </div>
                    <div>
                        <p>RESULTS</p>
                        {(round > 0) ?
                            <><p>Round {round}</p>
                                <p className="textMedium" style={{ color: 'yellow' }}>{result}</p>
                            </> : null}
                    </div>
                    <div>
                        <img className="selectedImage" src={(computerChoice === "Rock") ? RockPaperScissorAsset.Rock : (computerChoice === "Paper") ? RockPaperScissorAsset.Paper : RockPaperScissorAsset.Scissor} alt="Computer's Choice" />
                        <h4>{computerChoice}</h4>
                        <br />
                        <h4>A I</h4>
                    </div>
                </div>
            </div>
            <div style={{ display: popUp ? "block" : "none" }} className="popUpContainer" id="ticTacToe">
                <span onClick={() => setPopUp(false)} className="close"><FontAwesomeIcon icon="times" size="1x" /></span>
                <h2 className="textCenter">How To Play</h2>
                <p>You might already know the rules, if not these are the rules:</p>
                <ul>
                    <li>If you choose Rock, you will win against Scissors but lose against Paper.</li>
                    <li>If you choose Scissors, you will win against Paper but lose against Rock.</li>
                    <li>If you choose Paper, you will win against Rock but lose against Scissors.</li>
                </ul>
                <h4 className="textCenter">Good Luck!</h4>
            </div>
        </>
    )
}

export default RockPaperScissor
