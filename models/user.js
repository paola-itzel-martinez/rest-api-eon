const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  img: {
    type: String
  },
  rol: {
    type: String,
    emun: ['ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE'],
    default: 'USER_ROLE'
  },
  status: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
})

UserSchema.methods.toJSON = function() {
  const { __v, _id, password, ...user } = this.toObject()
  user.uid = _id

  return user
}

module.exports = model('User', UserSchema)
