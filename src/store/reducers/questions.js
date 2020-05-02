import { FETCH_QUESTIONS } from '../actions/actionTypes'

let initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return action.questions
    default:
      return state
  }
}
