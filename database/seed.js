const {faker} = require('@faker-js/faker')
const { conn, models : { Student, Campus }} = require('./conn')

const seed = async() =>
{
  await conn.sync({force:true})

  const unenrolled = await Campus.create({
    name: 'Not Currently Enrolled',
    imageUrl: null,
    address: '',
    description: 'Students in this list have either previously enrolled but have not completed their degrees or are enrolling for the first time. If anyone in this list has not taken courses in at least two years, please delete them.'
  })
  const fooState = await Campus.create({
    name: 'Foo State',
    imageUrl: null,
    address: '721 Broadway, New York, NY 10003',
    description: faker.lorem.paragraphs(2, '\n')
  })
  const bazzTech = await Campus.create({
    name: 'Bazz Tech',
    imageUrl: null,
    address: '86 Brattle Street, Cambridge, MA 02138',
    description: faker.lorem.paragraphs(2, '\n')
  })
  const barCollege = await Campus.create({
    name: 'Bar College',
    imageUrl: null,
    address: '1151 South Forest Ave, Tempe, Arizona 85281',
    description: faker.lorem.paragraphs(2, '\n')
  })
  const quqUniversity = await Campus.create({
    name: 'Quq University',
    imageUrl: null,
    address: 'Oxford OX1 2JD, UK',
    description: faker.lorem.paragraphs(2, '\n')
  })




  
  const Students = [
    { firstName: 'Moe', lastName: 'Smith', emailAddress: 'moesmith@gmail.com', imageUrl: faker.image.people(320, 240, false), gpa: 3.7, campusId: bazzTech.id },
    { firstName: 'Lucy', lastName: 'Ball', emailAddress: 'lucyball@aol.com', imageUrl: null, gpa: 3.9, campusId: fooState.id },
    { firstName: 'Ethyl', lastName: 'Beavers', emailAddress: 'ethylbeavers@pawnee.com', imageUrl: null, gpa: 3.2, campusId: fooState.id },
    { firstName: 'Larry', lastName: 'David', emailAddress: 'crazylarry@asu.edu', imageUrl: null, gpa: 2.6, campusId: unenrolled.id },
  ]

  await Promise.all(Students.map(async(student) =>{await Student.create({
    firstName: student.firstName,
    lastName: student.lastName,
    emailAddress: student.emailAddress,
    imageUrl: student.imageUrl,
    gpa: student.gpa,
    campusId: student.campusId
  });
  })) 
  
  const randomCampus = (arr) =>{
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const fakerP = () => {
    const first =  faker.name.firstName();
    const last = faker.name.lastName();
    const campus =  randomCampus([unenrolled, fooState, bazzTech, barCollege, quqUniversity, fooState, bazzTech, barCollege, quqUniversity, fooState, bazzTech, barCollege, quqUniversity]);
    console.log(campus)
    const campusID = campus.id;
    const email = () =>{
      if(campus === unenrolled){
        return `${first}${last}@hotmail.com`
      }
      else{
        return faker.internet.email(`${first}`, `${last}`, `${campus.name.toLowerCase().replace(/\s/g, "")}.edu`);
      }
    } 

    const gradePA = () => {
      if (campus.id === quqUniversity.id){
        return faker.datatype.number({ min: 2.5, max: 4, precision: 0.1 })
      }
      if (campus.id === fooState.id){
        return faker.datatype.number({ min: 2.2, max: 4, precision: 0.1 })
      }
      if (campus.id === barCollege.id){
        return faker.datatype.number({ min: 1.5, max: 3, precision: 0.1 })
      }
      if (campus.id === bazzTech.id){
        return faker.datatype.number({ min: 2, max: 4, precision: 0.1 })
      }
      if (campus.id === unenrolled.id){
        return faker.datatype.number({ min: 1, max: 3, precision: 0.1 })
      }
      else {
        return faker.datatype.number({ min: 1, max: 4, precision: 0.1 })
      }
    }

      return {
        firstName: first,
        lastName: last,
        emailAddress: email(),
        campusId: campusID,
        gpa: gradePA(),
        imageUrl: null,
      }
    }
  

  const dummyStudents243= new Array(243).fill('')
  await Promise.all(
    dummyStudents243.map(async()=>{
        await Student.create({
          firstName, lastName, emailAddress, campusId, gpa, imageUrl} = fakerP()
        )
      })
    )
}

module.exports = seed