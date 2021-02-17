import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Auth from './Pages/Auth'
import Home from './Pages/Home'
import Document from './Pages/Document'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Auth} />
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/newdocument">
          <Document />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes


