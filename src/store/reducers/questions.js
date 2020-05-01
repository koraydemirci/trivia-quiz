import { FETCH_QUESTIONS } from '../actions/actionTypes'

let initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS:
      console.log('action', action)
      return action.questions
    default:
      return state
  }
}
