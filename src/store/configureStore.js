import { createStore, applyMiddleware, combineReducers } from 'redux'
import ReduxThunk from 'redux-thunk'
import questionsReducer from './reducers/questions'

export const configureStore = () => {
  const rootReducer = combineReducers({
    questions: questionsReducer
  })

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

  return store
}
