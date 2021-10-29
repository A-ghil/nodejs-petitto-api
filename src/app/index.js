const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express();
const router = require('../routers')

require('dotenv').config()
require('../config/mongoose')

app.use(cors())
app.use(express.json());

app.use('/api',router)
app.use('/', express.static(path.join(__dirname, '..','..','public')))

module.exports = app