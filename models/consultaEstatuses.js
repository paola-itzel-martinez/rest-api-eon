const { Schema, model } = require("mongoose");

const ModelSchema = Schema({
  code: {
    type: String,
    required: [true, "code is required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "name is required"],
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
});

ModelSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();

  data.uid = _id;

  return data;
};

module.exports = model("ConsultaEstatus", ModelSchema);
