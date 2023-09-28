const { Schema, model } = require("mongoose");

const ModelSchema = Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  rfc: {
    type: String,
    required: [true, "rfc is required"],
  },
  status: {
    type: Boolean,
    default: true,
  },
});

ModelSchema.methods.toJSON = function () {
  const { __v, _id, password, ...data } = this.toObject();
  data.uid = _id;

  return data;
};

module.exports = model("Client", ModelSchema);
