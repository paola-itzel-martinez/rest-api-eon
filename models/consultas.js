const { Schema, model } = require("mongoose");

const ModelSchema = Schema({
  dateCreated: {
    type: Date,
    required: [true, "dateCreated is required"],
  },
  otorgante: {
    type: Schema.Types.ObjectId,
    ref: "Otorgante",
    required: true,
  },
  status: {
    type: Schema.Types.ObjectId,
    ref: "ConsultaEstatus",
    required: true,
  },
  isActive: {
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

module.exports = model("Consulta", ModelSchema);
