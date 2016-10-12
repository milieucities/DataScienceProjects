import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './Layout/Layout'
import Home from './Home/Home'

module.exports = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home}/>
  </Route>
);
