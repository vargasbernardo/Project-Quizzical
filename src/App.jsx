import React from 'react'
import StartScreen from './StartScreen'
import QuestionsScreen from './QuestionsScreen'
import blob5 from './images/blob-5.png'
import blobyellow from './images/blob-yellow.png'
import {nanoid} from 'nanoid'
import {decode} from 'html-entities'
import './App.css'

export default function App() {
    const [startQuizz, setStartQuiz] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [answersChecked, setAnswersChecked] = React.useState(false)
    const [results, setResults] = React.useState([])

    React.useEffect(function getQuestions() {
        fetch('https://opentdb.com/api.php?amount=5')
            .then(response => response.json())
            .then(data => {
                setQuestions(data.results.map(question => {

                    const decodedQuestion = decode(question.question);
                    const decodedCorrectAnswer = decode(question.correct_answer);
                    const decodedIncorrectAnswers = question.incorrect_answers.map(answer => decode(answer));


                    return {
                        id: nanoid(),
                        question: decodedQuestion,
                        correctAnswer: decodedCorrectAnswer,
                        allAnswers: shuffle([...decodedIncorrectAnswers, decodedCorrectAnswer]),
                        selectedAnswer: ""
                    }
                    
                    
                }))
            })
    }, [])
    

    console.log(questions)

    function selectAnswer(e, questionId, index) {
        setQuestions(prevQuiz => {
          return prevQuiz.map(question => {
            if (question.id === questionId) {
              return {
                ...question,
                selectedAnswer: index
              };
            }
            return question;
          });
        });
      }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        return array
    }

    function checkAnswers() {
        setAnswersChecked(true)
        const newResults = []
        for (let i = 0; i < questions.length; i++) {
          if (questions[i].allAnswers[questions[i].selectedAnswer] === questions[i].correctAnswer) {
            newResults.push(true)
          } else {
            newResults.push(false)
          }
        }
        setResults(newResults)
        if (answersChecked) {
          restartQuiz()
        }
      }

      function restartQuiz(){
        setQuestions([])
        setResults([])
        setAnswersChecked(false)
      }
    
    
    function handleStart() {
        console.log('clicked')
        setStartQuiz(true)
    }
    
    return (
        <div>
            <img src={blob5} className="blob-purple"/>
            <img src={blobyellow} className="blob-yellow"/>
            {startQuizz ? (<QuestionsScreen  restartQuiz={restartQuiz}results={results} answersChecked={answersChecked} checkAnswers={checkAnswers} selectAnswer={selectAnswer} quiz={questions}/>) : (<StartScreen handleStart={handleStart}/>)}
        </div>
    )
}