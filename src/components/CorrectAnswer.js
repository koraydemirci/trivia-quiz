import React from 'react'

const CorrectAnswer = ({showNextQuestion}) => {
  return  <div>
    <div>Correct Anser</div>
    <div>
      <button onClick={showNextQuestion}>Next</button>
    </div>
  </div>
  
  
}

export default CorrectAnswer
