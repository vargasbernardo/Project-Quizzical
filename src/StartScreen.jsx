import React from "react"

export default function StartScreen(props) {
    return (
        <div className="start--container">
            <h1 className="start--title">Quizzical</h1>
            <p className="start--description">Welcome to my trivia React App, press the button to get your questions</p>
            <button onClick={props.handleStart} className="btn">Start Quizz</button>
        </div>
    )
}