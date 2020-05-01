import axios from 'axios'
import _ from 'lodash'
import { FETCH_QUESTIONS } from './actionTypes'

export const fetchQuestions = url => {
  return async dispatch => {
    try {
      const response = await axios.get(url)

      const insert = (arr, index, newItem) => [
        // part of the array before the specified index
        ...arr.slice(0, index),
        // inserted item
        newItem,
        // part of the array after the specified index
        ...arr.slice(index)
      ]

      let questions = _.get(response, 'data.results') || []
      questions = questions.map(question => {
        const randomIndex = Math.floor(Math.random() * 4)
        const allAnswers = insert(
          question.incorrect_answers,
          randomIndex,
          question.correct_answer
        )
        question.allAnswers = allAnswers
        return question
      })

      dispatch({
        type: FETCH_QUESTIONS,
        questions
      })
    } catch (error) {
      console.log(error)
    }
  }
}
