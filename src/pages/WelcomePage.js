import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'
import Lottie from 'react-lottie'
import {
  Button,
  Form,
  Grid,
  Dropdown,
  Dimmer,
  Loader,
  Header,
  Modal,
  Card
} from 'semantic-ui-react'
import { fetchQuestions } from '../store/actions/questions'
import { BrainAnimation } from '../lotties'
import AppConfig from '../config'

const { numberOfQuestions } = AppConfig

const difficultyLevels = [
  { key: 'easy', value: 'easy', text: 'Easy' },
  { key: 'medium', value: 'medium', text: 'Medium' },
  { key: 'hard', value: 'hard', text: 'Hard' }
]

const WelcomePage = props => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('9')
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      try {
        const response = await axios.get('https://opentdb.com/api_category.php')
        if (!response) {
          throw new Error('no response')
        }
        let categories = _.get(response, 'data.trivia_categories')
        if (!categories || !_.get(categories, 'length')) {
          throw new Error('no categories')
        }
        categories = categories.map(category => {
          category.text = category.name
          category.value = category.id
          category.key = category.id
          return category
        })
        setCategories(categories)
      } catch (error) {
        console.log(error)
        setError(true)
      }
      setLoading(false)
    }

    getCategories()
  }, [])

  const handleSelectCategory = (event, data) => {
    const selectedCategory = data.value
    setSelectedCategory(selectedCategory)
  }

  const handleSelectDifficulty = (event, data) => {
    const selectedDifficulty = data.value
    setSelectedDifficulty(selectedDifficulty)
  }

  const startQuiz = async () => {
    const fetchQuestionsUrl = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`
    setLoading(true)
    try {
      await dispatch(fetchQuestions(fetchQuestionsUrl))
    } catch (error) {
      console.log(error)
      setError(true)
    }
    setLoading(false)
    history.push('/quiz')
  }

  const handleCloseModal = (event, data) => {
    if (_.get(data, 'actions.0.key') === 'close') {
      setError(false)
    }
  }

  return (
    <>
      <Dimmer active={loading} inverted>
        <Loader />
      </Dimmer>
      <Modal
        open={error}
        header='Error!'
        content='Something went wrong when loading questions. Please refresh page and try again!'
        actions={[{ key: 'close', content: 'Close', positive: true }]}
        onActionClick={handleCloseModal}
        closeOnDimmerClick
        dimmer={'blurring'}
      />
      <Grid
        textAlign='center'
        style={{ height: '100vh' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 500 }}>
          <Card fluid>
            <Card.Content>
              <Header size='huge'>TRIVIA GAME</Header>
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: BrainAnimation,
                  rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice'
                  }
                }}
                height={200}
                width={200}
              />
              <Form>
                <Form.Field>
                  <label>Categories</label>
                  <Dropdown
                    onChange={handleSelectCategory}
                    placeholder='General Knowledge'
                    fluid
                    selection
                    options={categories}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Difficulty Level</label>
                  <Dropdown
                    onChange={handleSelectDifficulty}
                    placeholder='Easy'
                    fluid
                    selection
                    options={difficultyLevels}
                  />
                </Form.Field>
                <Button onClick={startQuiz} color='green' fluid size='large'>
                  Get Started
                </Button>
              </Form>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </>
  )
}

export default WelcomePage
