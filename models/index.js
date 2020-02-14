/* Mongo Database
* - this is where we set up our connection to the mongo database
*/
require('dotenv')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true);
let MONGO_URL
const MONGO_LOCAL_URL = `mongodb://localhost:27017/top-5-typers`
///// Your Models Required and Added to db Object Here////////

const Gamer = require('./gamers')
const db = { Gamer }

// const User = require('./models/user')
// const Post = require('./models/post')
// const PendingReset = require('./models/pendingReset')
// const db = { Post, User, PendingReset }

///////////// ///////////////// ////////////////////////
if (process.env.MONGODB_URI) {
mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
MONGO_URL = process.env.MONGODB_URI
} else {
mongoose.connect(MONGO_LOCAL_URL, { useUnifiedTopology: true, useNewUrlParser: true }) // local mongo url
MONGO_URL = MONGO_LOCAL_URL
}

db.connection = mongoose.connection
db.connection.on('error', err => {
console.log(`There was an error connecting to the database: ${err}`)
})
db.connection.once('open', () => {
console.log(
`You have successfully connected to your mongo database: ${MONGO_URL}`
)
// return process.env.MONGODB_URI ? null : seedDatabase(db)
})

function seedDatabase(db) {
db.connection.dropDatabase();
require('../seed')(db);
}
module.exports = db