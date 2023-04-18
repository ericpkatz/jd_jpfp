const { conn, models : { Student, Campus }} = require('./conn')
const seed = require('./seed')

module.exports={
  seed, 
  conn, 
  models: {
    Student,
    Campus
  }
}