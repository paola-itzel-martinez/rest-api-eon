const { Schema, model } = require('mongoose')

const OtorganteSchema = Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true
  },
  status: {
    type: Boolean,
    default: true,
    required: true
  }
})

OtorganteSchema.methods.toJSON = function() {
  const { __v, _id, ...data } = this.toObject()

  data.uid = _id
  
  return data
}

module.exports = model('Otorgante', OtorganteSchema)
