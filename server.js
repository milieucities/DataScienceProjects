import express from 'express'
import path from 'path'
import compression from 'compression'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from './components/routes'

var app = express()

app.use(compression())

app.use(express.static(path.join(__dirname, 'public'), {index: false}));

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      const appHtml = renderToString(<RouterContext {...props}/>)
      res.send(renderPage(appHtml))
    } else {
      res.status(404).send('Not Found')
    }
  })
})

function renderPage(appHtml) {
  return `
  <!doctype html public>
  <html>
  <head>
    <meta charset="utf-8"/>
    <title>DataScienceProjects</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
  </head>
  <body>
    <div id="body"></div>
    <script src="/bundle.js"></script>
  </body>
  </html>
   `
}

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
