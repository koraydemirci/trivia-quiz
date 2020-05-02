import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Grid, Segment, Button, Card } from 'semantic-ui-react'
import _ from 'lodash'
import { Message, Question, Timer } from '../components'
import { insertItemToArrayRandomly } from '../utils/helpers'
import AppConfig from '../config'

const { numberOfQuestions } = AppConfig

const Quiz = props => {
  const { questions } = useSelector(state => state)
  const history = useHistory()

  const [currentQuestionIndex, setQurrentQuestionIndex] = useState(0)
  const [message, setMessage] = useState('')
  const [isJokerUsed, setIsJokerUsed] = useState(false)
  const [totalPoints, setTotalPoints] = useState(0)
  const [newPoints, setNewPoints] = useState(0)

  const ref = React.createRef()

  const handleTimeIsUp = () => {
    setMessage('timeIsUp')
    setNewPoints(0)
  }

  const handleJoker = () => {
    const disableWrongAnswers = () => {
      const currentQuestion = questions[currentQuestionIndex]
      const incorrectAnswers = currentQuestion.incorrect_answers
      //eliminate two wrong answers randomly
      for (let i = 0; i < 2; i++) {
        incorrectAnswers.splice(
          Math.floor(Math.random() * incorrectAnswers.length),
          1
        )
      }
      //insert correct answer to incorrect answers array randomly
      const randomIndex = Math.floor(Math.random() * 2)
      const remainingAnswers = insertItemToArrayRandomly(
        incorrectAnswers,
        randomIndex,
        currentQuestion.correct_answer
      )
      currentQuestion.allAnswers = remainingAnswers
    }

    setIsJokerUsed(true)
    disableWrongAnswers()
  }

  const checkAnswer = event => {
    const answer = _.get(event, 'currentTarget.textContent')
    const currentQuestion = questions[currentQuestionIndex]
    if (answer === _.get(currentQuestion, 'correct_answer')) {
      const remainedTime = +_.get(ref, 'current.textContent')
      const pointsPerSecond = 10
      const newPoints = remainedTime * pointsPerSecond
      setNewPoints(newPoints)
      setTotalPoints(totalPoints + newPoints)
      if (currentQuestionIndex < 9) {
        setMessage('correctAnswer')
      } else {
        setMessage('quizIsCompleted')
      }
    } else {
      setMessage('wrongAnswer')
      setNewPoints(0)
    }
  }

  const messageHandler = handlerName => {
    setMessage('')
    if (handlerName === 'handleCorrectAnswer') {
      setQurrentQuestionIndex(currentQuestionIndex + 1)
      setMessage('')
    } else {
      history.push('/')
    }
  }

  if (message) {
    return (
      <Message
        message={message}
        messageHandler={messageHandler}
        totalPoints={totalPoints}
        newPoints={newPoints}
        currentQuestionIndex={currentQuestionIndex}
      />
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  if (currentQuestion) {
    return (
      <Grid
        textAlign='center'
        style={{ height: '100vh' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 600 }}>
          <Card fluid>
            <Segment.Group horizontal>
              <Segment>
                Question:{' '}
                <strong>
                  {currentQuestionIndex + 1} / {numberOfQuestions}
                </strong>
              </Segment>
              <Segment>
                Points: <strong>{totalPoints}</strong>
              </Segment>
              <Segment>
                Remaining Time:{' '}
                <Timer handleTimeIsUp={handleTimeIsUp} ref={ref} />
              </Segment>
            </Segment.Group>
            {!isJokerUsed && (
              <Card.Content>
                <Button
                  fluid
                  color='yellow'
                  content='50% Joker'
                  onClick={handleJoker}
                />
              </Card.Content>
            )}
            <Card.Content>
              <Question
                currentQuestion={currentQuestion}
                checkAnswer={checkAnswer}
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }

  return <Redirect to='/' />
}

export default Quiz
