import React, { useState } from 'react'
import _ from 'lodash'
import {useSelector} from 'react-redux'
import WrongAnswer from '../components/WrongAnswer'
import TimeIsUp from '../components/TimeIsUp'
import CorrectAnswer from '../components/CorrectAnswer'
import Question from '../components/Question'
import Timer from '../components/Timer'
import Joker from '../components/Joker'

const Quiz = props => {
  const {questions}= useSelector(state => state)

  const [currentQuestionIndex, setQurrentQuestionIndex] = useState(0)
  const [isWrongAnswer, setIsWrongAnswer] = useState(false)
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
  const [isTimeUp, setIsTimeUp] = useState(false)
  const [isJokerUsed, setIsJokerUsed] = useState(false)
  const [points, setPoints] = useState(0)

  const ref = React.createRef()

  const checkAnswer = event => {
    const answer = event.currentTarget.textContent
    if (answer === _.get(questions[currentQuestionIndex], 'correct_answer')) {
      setShowCorrectAnswer(true)
      const remainedTime = +ref.current.textContent
      const newPoints = remainedTime * 10
      setPoints(points + newPoints)
    } else {
      setIsWrongAnswer(true)
    }
  }

  const showNextQuestion = () => {
    setShowCorrectAnswer(false)
    setQurrentQuestionIndex(currentQuestionIndex + 1)
  }

  const handleTimeIsUp = () => {
    setIsTimeUp(true)
  }

  const handleJoker = () => {
    const disableWrongAnswers = () => {
      const currentQuestion = questions[currentQuestionIndex]
      const incorrectAnswers = currentQuestion.incorrect_answers
      for (let i = 0; i  < 2; i++) {
        incorrectAnswers.splice(Math.floor(Math.random() * incorrectAnswers.length), 1)
      }
      const randomIndex = Math.floor(Math.random() * 2)
      const insert = (arr, index, newItem) => [
        // part of the array before the specified index
        ...arr.slice(0, index),
        // inserted item
        newItem,
        // part of the array after the specified index
        ...arr.slice(index)
      ]

      const remainingAnswers = insert(
        incorrectAnswers,
        randomIndex,
        currentQuestion.correct_answer
      )
      currentQuestion.allAnswers = remainingAnswers

    }

    setIsJokerUsed(true)
    disableWrongAnswers()
  }

  const currentQuestion = questions[currentQuestionIndex]

  if (isTimeUp) {
    return <TimeIsUp />
  }

  if (isWrongAnswer) {
    return <WrongAnswer />
  }

  if (showCorrectAnswer) {
    return <CorrectAnswer showNextQuestion={showNextQuestion} />
  }

  if (currentQuestion) {
    return (
      <div>
        {!isJokerUsed && <Joker handleJoker={handleJoker} />}
        <div>{points}</div>
        <Timer handleTimeIsUp={handleTimeIsUp} ref={ref}/>
        <Question currentQuestion={currentQuestion} checkAnswer={checkAnswer} />
      </div>
    )
  }

  return null
}

export default Quiz
