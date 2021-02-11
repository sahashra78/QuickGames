import React, { useEffect, useState, useReducer } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function MathGenius() {
    const [popUp, setPopUp] = useState(false);
    const [firstVariable, setFirstVariable] = useState(null);
    const [secondVariable, setSecondVariable] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(null);
    const [optionList, setOptionList] = useState(Array(4).fill(null));
    const [score, setScore] = useState(0);
    const [finalScore, setFinalScore] = useState(null);
    const [timer, setTimer] = useState(20);
    const [runningState, setRunningState] = useState(false);
    const [firstTime, setFirstTime] = useState(true);
    const [btnDisabled, toogleBtnDisable] = useReducer(
        (btnDisabled) => !btnDisabled, false
    );

    useEffect(() => {
        inputGenerator();
    }, [score]);
    useEffect(() => {
        let fillOptions = () => {
            let correctBox = (Math.floor(Math.random() * 4) + 1);
            let optionArray = (Array(4).fill(null));
            optionArray[correctBox] = answer;
            for (let i = 0; i < optionArray.length; i++) {
                if (optionArray[i] === null) {
                    let random = (Math.floor(Math.random() * 20) - 10);
                    optionArray[i] = answer + random;
                }
            }
            setOptionList([...optionArray]);
            optionArray = [];
        }
        fillOptions();
        return() => {
            setOptionList([]);
        }
    }, [answer]);

    useEffect(() => {
        checkGameState();
        // eslint-disable-next-line
    }, [timer]);

    const checkGameState = () => {
        if (firstTime) {
            setFirstTime(false);
            setScore(0);
            setResult(null);
            return;
        }
        setRunningState(true);
        let timeout;
        if (timer > 0) {
            timeout = setTimeout(() => setTimer(timer - 1), 1000);
        }
        else {
            toogleBtnDisable();
            setTimer(20);
            setRunningState(false);
            setFirstTime(true);
            setFinalScore(score);
            setTimeout(() => toogleBtnDisable(), 1000);
        }
        return() => {
            clearTimeout(timeout);
        }
        
    }
    const checkAnswer = (option) => {
        if (answer === option) {
            setScore(score + 10);
            setResult(<><h4 style={{ color: 'green' }}>CORRECT ! +10 Pts</h4></>);
        }
        else {
            setScore(score - 2);
            setResult(<><h4 style={{ color: 'red' }}>WRONG ! -2 Pts</h4></>);
        }
    }

    let inputGenerator = () => {
        const min = 1; const max = 10;
        let firstNum = (Math.floor(Math.random() * (max - min + 1)) + min);
        let secondNum = (Math.floor(Math.random() * (max - min + 1)) + min);
        setFirstVariable(firstNum);
        setSecondVariable(secondNum);
        setAnswer(firstNum * secondNum);
    }

    const Box = optionList.map((option, index) => (<div key={index.toString()}><button className="rounded_btn textMedium" key={index} onClick={() => checkAnswer(option)} >{option}</button></div>));
    return (
        <>
            <div className="gameWindow wrapper textWhite">
                <div>
                    <Link to="/" className="backButton textExtraLarge">
                        <span><FontAwesomeIcon icon="chevron-left" size="1x" /></span> <span className="textMedium">BACK</span>
                    </Link>
                    <h1 className="textCenter textExtraLarge"> MULTIPLICATION QUIZ </h1>
                    <span className="textSmall showInfo"><FontAwesomeIcon icon="info-circle" size="1x" onClick={() => setPopUp(true)} /></span>
                    <div className="textCenter mathCard">
                        <p className="score">Score: {score}</p>
                        <p className="timer">Timer: {timer}</p>
                        <button key="startAgain" disabled={btnDisabled} onClick={() => checkGameState()} style={{ display: (runningState) ? "none" : "block" }} className="startButton"><><h1>START</h1>
                            {(finalScore !== null) ? (<h4>Your Score is {finalScore}<br />{(finalScore > 99) ? <span className="textSmall" style={{ color: 'green' }}>You're Genius!</span> : (finalScore > 49) ? <span className="textSmall" style={{ color: 'yellow' }}>Keep It Up!</span> : (finalScore > 0) ? <span className="textSmall" style={{ color: 'orange' }}>You can do it!</span> : <span className="textSmall" style={{ color: 'red' }}>Gotta try harder!</span>}<br />Click to Start!</h4>) : null}</></button>
                        <div className="flex mathQuestion"><span>{firstVariable}</span> <span> X </span> <span>{secondVariable}</span></div>
                        <div style={{ columns: 2 }}>
                            {Box}
                        </div>
                        {result}
                    </div>
                </div>
            </div>
            <div style={{ display: popUp ? "block" : "none" }} className="popUpContainer" id="ticTacToe">
                <span onClick={() => setPopUp(false)} className="close"><FontAwesomeIcon icon="times" size="1x" /></span>
                <h2 className="textCenter">How To Play</h2>
                <p>You might already know about Maths. This quiz focus on Multiplication.</p>
                <ul>
                    <li>Find the multiplication of two displayed numbers.</li>
                    <li>Choose the correct answer from the given options.</li>
                    <li>You will earn 10 points on every correct answer.</li>
                    <li>You will lose 2 points on every incorrect answer.</li>
                    <li>You have 20 seconds to answer as many questions as you can.</li>
                </ul>
                <h4 className="textCenter">Good Luck!</h4>
            </div>
        </>
    )
}

export default MathGenius
