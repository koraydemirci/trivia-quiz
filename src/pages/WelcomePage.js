import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'
import Lottie from 'react-lottie'
import { Button, Form, Grid, Dropdown } from 'semantic-ui-react'
import { fetchQuestions } from '../store/actions/questions'
import animationData from '../lotties/welcome.json'

const WelcomePage = props => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('9')
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy')

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api_category.php')
        let categories = _.get(response, 'data.trivia_categories')
        categories = categories.map(category => {
          category.text = category.name
          category.value = category.id
          category.key = category.id
          return category
        })
        setCategories(categories)
      } catch (error) {
        console.log(error)
      }
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
    const fetchQuestionsUrl = `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`
    console.log('fetchQuestionsUrl', fetchQuestionsUrl)
    await dispatch(fetchQuestions(fetchQuestionsUrl))
    history.push('/quiz')
  }

  const difficultyLevels = [
    { key: 'easy', value: 'easy', text: 'Easy' },
    { key: 'medium', value: 'medium', text: 'Medium' },
    { key: 'hard', value: 'hard', text: 'Hard' }
  ]

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }}
          height={400}
          width={400}
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

          <Button onClick={startQuiz} color='teal' fluid size='large'>
            Get Started
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default WelcomePage
