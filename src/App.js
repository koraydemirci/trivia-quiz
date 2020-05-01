import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import QuizPage from './pages/QuizPage'
import 'semantic-ui-css/semantic.min.css'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/quiz'>
          <QuizPage />
        </Route>
        <Route path='/'>
          <WelcomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
