import React from 'react'
import { render } from 'react-dom'
import Layout from './Layout/Layout'

(() => {
  const selector = document.querySelector('#body')
  selector && render(<Layout/>, selector)
})()
