const Sequelize = require('sequelize')

// Models
const users_model = require('./users_model')
const venue_contacts_model = require('./venue_contacts_model')
const venues_model = require('./venues_model')

// .env variables
const { DB_DB, DB_USER, DB_PASS, DB_HOST } = process.env

const sequelizeInstance = new Sequelize(DB_DB, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres',

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  define: {
    timestamps: false
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
})

const preModels = [
  { key: 'Users', setup: users_model },
  { key: 'Venues', setup: venues_model },
  { key: 'VenueContacts', setup: venue_contacts_model }
]

let postModels = { models: {}, sequelizeInstance }

preModels.forEach(model => {
  const setupModel = model.setup(sequelizeInstance, Sequelize)
  postModels.models[model.key] = setupModel
})

module.exports = postModels
