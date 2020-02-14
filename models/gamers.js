
const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise


// Define postSchema
const postSchema = new Schema({
name: { type: String, unique: false },
time: { type: Number, unique: false },
// likes: [{ type: Schema.Types.ObjectId, ref: 'User'}],
// media: [{ type: String }],
// owner: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
// created_at: { type: Date, default: () => Date.now() },
// updated_at: { type: Date }
})


// Define schema methods
// postSchema.methods = {
// populateLikes: callback => this.populate('likes').exec(callback),
// }
// Define hooks for pre-saving
// postSchema.pre('save', function(next) {
// now = new Date();
// this.updated_at = now;
// next()
// })
// Define hooks for pre-removing
postSchema.pre('remove', async function(next) {
// console.log('pre-Remove Run %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
// const User = require('./user')
// console.log(User)
// let response = await User.update({ likes: this._id }, { $pull: { likes: this._id }}, {multi: true}).catch(err => next(new Error('Unable to update User object on remove - action cancelled.')))
// console.log(response)

next();
})


// Create reference to User & export
const Post = mongoose.model('Post', postSchema)
module.exports = Post