import React, { Component } from 'react'
import css from './layout.scss'

export default class extends Component {
  render() {
    return <div id='layout'>
      {this.props.children}
    </div>;
  }
}
