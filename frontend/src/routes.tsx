import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from './pages/Landing'
import List from './pages/List'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/list" component={List} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes