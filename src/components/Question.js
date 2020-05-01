import React from 'react'

const Question = ({currentQuestion, checkAnswer}) => {
  return (
    <div>
      <div>{currentQuestion.question}</div>
      <div>{currentQuestion.allAnswers.map((a, i) => <div onClick={checkAnswer} key={i}>{a}</div>)}</div>
    </div>
  )
}

export default Question
