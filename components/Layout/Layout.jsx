import React, { Component } from 'react'
import Home from '../Home/Home'
import css from './layout.scss'

export default class extends Component {
  render() {
    return(
      <div id='layout'>
        <Home />
      </div>
    );
  }
}
