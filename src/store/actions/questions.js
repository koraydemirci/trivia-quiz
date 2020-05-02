import axios from 'axios'
import _ from 'lodash'
import {insertItemToArrayRandomly} from '../../utils/helpers'
import { FETCH_QUESTIONS } from './actionTypes'

export const fetchQuestions = url => {
  return async dispatch => {
    try {
      const response = await axios.get(url)
      if (!response) {
        throw new Error('no response')
      }
      let questions = _.get(response, 'data.results') 

      if (!questions || !_.get(questions, 'length')) {
        throw new Error('no questions')
      }
      questions = questions.map(question => {
        const {incorrect_answers, correct_answer} = question
        const randomIndex = Math.floor(Math.random() * 4)
        //insert correct answer to incorrect answers array randomly
        const allAnswers = insertItemToArrayRandomly(
          incorrect_answers,
          randomIndex,
          correct_answer
        )
        question.allAnswers = allAnswers
        console.log(correct_answer)
        return question
      })

      dispatch({
        type: FETCH_QUESTIONS,
        questions
      })
    } catch (error) {
      console.log(error)
      throw new Error('no questions')
    }
  }
}
