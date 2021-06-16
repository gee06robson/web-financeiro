import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Auth from './Pages/Auth'
import Register from './Pages/Register'
import Home from './Pages/Home'
import Document from './Pages/Document'
import UpdateDocument from './Pages/Update_Document'
import Extract from './Pages/Extract'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>

        <Route path="/" exact component={Auth} />

        <Route path="/home">
          <Home />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/newdocument/" exact>
          <Document />
        </Route>

        <Route path="/newdocument/:code_list">
          <Document />
        </Route>

        <Route path="/extract/:code_list">
          <Extract />
        </Route>

        <Route path="/update/:id">
          <UpdateDocument />
        </Route>
        
      </Switch>
    </BrowserRouter>
  )
}

export default Routes


