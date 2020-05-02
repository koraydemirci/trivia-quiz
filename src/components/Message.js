import React from 'react'
import { Grid, Button, Header, Card } from 'semantic-ui-react'
import Lottie from 'react-lottie'
import {
  CorrectAnimation,
  WrongAnimation,
  TimeIsUpAnimation,
  CongratulationsAnimation
} from '../lotties'

const messageLookup = {
  correctAnswer: {
    text: 'Your answer is correct!',
    handlerName: 'handleCorrectAnswer',
    buttonText: 'Next Question',
    animationData: CorrectAnimation
  },
  wrongAnswer: {
    text: 'Your answer is wrong!',
    handlerName: 'handleWrongAnswer',
    buttonText: 'Create A New Quiz',
    animationData: WrongAnimation
  },
  timeIsUp: {
    text: "Your haven't answered the question in 15 seconds!",
    handlerName: 'handleTimeIsUp',
    buttonText: 'Create A New Quiz',
    animationData: TimeIsUpAnimation
  },
  quizIsCompleted: {
    text: 'Your have answered all questions correct. Congratulations!',
    handlerName: 'handleCompleteQuiz',
    buttonText: 'Create A New Quiz',
    animationData: CongratulationsAnimation
  }
}

const numberOfQuestions = 10

const Message = ({
  message,
  messageHandler,
  totalPoints,
  newPoints,
  currentQuestionIndex
}) => {
  const { text, handlerName, buttonText, animationData } = messageLookup[
    message
  ]

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 500 }}>
        <Card fluid>
          <Card.Content header={`Question: ${currentQuestionIndex + 1} / ${numberOfQuestions}`} />
          <Card.Content>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: animationData,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice'
                }
              }}
              height={200}
              width={200}
            />
            <Header size='medium'>{text}</Header>
            <p>You have earned <strong>{newPoints}</strong> points.</p>
            <p className='bold'>TOTAL POINTS: {totalPoints}</p>
            <Button
              color='green'
              fluid
              size='large'
              onClick={() => messageHandler(handlerName)}
            >
              {buttonText}
            </Button>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  )
}

export default Message
