const port = process.env.PORT || 3000;
const app = require('./app');
const { seed, conn, models : { Student, Campus }} = require('../database')

// gets
app.get('/api/students', async(req, res, next) =>{
  try{
    res.send(await Student.findAll({
      order: [
        ['lastName', 'ASC'],
        ['firstName', 'ASC']
      ]
    }))
  }
  catch(err){
    next(err)
  }
})
app.get('/api/campuses', async(req, res, next) =>{
  try{
    res.send(await Campus.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
      
    }))
  }
  catch(err){
    next(err)
  }
})

// posts
app.post('/api/students', async(req, res, next) =>{
  try{
    const newStudent = await Student.create(req.body)
    console.log(newStudent)
    res.send(newStudent)
  }
  catch(err){
    next(err)
  }
})
app.post('/api/campuses', async(req, res, next) =>{
  try{
    const newCampus = await Campus.create(req.body)
    res.send(newCampus)
  }
  catch(err){
    next(err)
  }
})

// puts
app.put('/api/students/:id', async(req, res, next) =>{
  try{
    const editedStudent = await Student.findByPk(req.params.id)
    await editedStudent.update(req.body)
    res.send(editedStudent)
  }
  catch(err){
    next(err)
  }
})
app.put('/api/campuses/:id', async(req, res, next) =>{
  try{
    const editedCampus = await Campus.findByPk(req.params.id)
    await editedCampus.update(req.body)
    res.send(editedCampus)
  }
  catch(err){
    next(err)
  }
})

// deletes
app.delete('/api/students/:id', async(req, res, next) =>{
  try{
    const deletedStudent = await Student.findByPk(req.params.id)
    await deletedStudent.destroy()
  }
  catch(err){
    next(err)
  }
})
app.delete('/api/campuses/:id', async(req, res, next) =>{
  try{
    const deletedCampus = await Campus.findByPk(req.params.id)
    await deletedCampus.destroy()
  }
  catch(err){
    next(err)
  }
})



app.use((err, req, res, next)=> {
  console.log(err);
  res.status(500).send({ error: err.message });
});


app.listen(port, async()=> {
  console.log(`listening on port ${port}`)
    await seed()
  console.log('seeded');
});
