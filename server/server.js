require('isomorphic-fetch')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const favicon = require('serve-favicon')
const routes = require('./routes')
const { camelKeys } = require('./middlewares')
const errorHandlers = require('./handlers/errorHandlers')
const isProduction = process.env.NODE_ENV === 'production'
const app = express()

// ======================================
// # Statics
// ======================================
app.use(express.static('dist'))

if (isProduction) {
  app.use(favicon(path.join(__dirname, '../', '/dist/images/favicons/favicon.ico')))
}

// ======================================
// # Middlewares
// ======================================
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator())
app.use(camelKeys)

// ======================================
// # Redirects
// ======================================
app.get('/learnjs', (req, res) => (res.redirect('https://learnjavascript.today')))

// ======================================
// # Routes
// ======================================
app.use('/', routes)

// ======================================
// # Error handlers
// ======================================
app.use(errorHandlers.notFound)

if (isProduction) {
  app.use(errorHandlers.prodErrors)
} else {
  app.use(errorHandlers.devErrors)
}

module.exports = app
