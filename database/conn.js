const { DECIMAL } = require('sequelize')
const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL||'postgres://localhost/jdb_jpfp_2212_db')

const {STRING, TEXT, UUID, UUIDV4} = Sequelize.DataTypes

const Student = conn.define('student', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  firstName: {
    type: STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  emailAddress: {
    type: STRING,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    }
  },
  imageUrl:{
    type: STRING,
    allowNull: true,
  },
  gpa: {
    type: DECIMAL(10,1),
    validate: {
      max: 4.0,
      min: 0.0
    }
  }
})

const Campus = conn.define('campus', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  imageUrl:{
    type: STRING,
    allowNull: true,
  },
  address: {
    type: STRING,
    allowNull: false
  },
  description: {
    type: TEXT
  }
})

Student.belongsTo(Campus, {
  foreignKey: {
    name: 'campusId',
    allowNull: true
  }
})
Campus.hasMany(Student)

module.exports = {
  conn,
  models : {
    Student,
    Campus
  }
}