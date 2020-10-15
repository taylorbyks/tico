import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from './pages/Landing'
import List from './pages/List'
import Pet from './pages/Pet'
import CreatePet from './pages/CreatePet'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/list" component={List} />
        <Route path="/pets/create" component={CreatePet} />
        <Route path="/pets/:id" component={Pet} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes