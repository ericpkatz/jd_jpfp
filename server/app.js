const express = require('express')
const app = express()
const path = require('path')
const { seed, conn, models : { Student, Campus }} = require('../database')


// static middleware
app.use('/dist', express.static(path.join(__dirname, '../dist')))
app.use('/public', express.static(path.join(__dirname,'../public')))
app.use(express.json())

app.get('/', (req, res)=>res.sendFile(path.join(__dirname, '../public/index.html')))

module.exports = app;

