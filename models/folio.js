const { Schema, model } = require("mongoose");

const ModelSchema = Schema({
  productType: {
    type: String,
    default: "Reporte de credito",
  },
  expedientType: {
    type: String,
    default: "(1) Consultas",
  },
  folioCC: {
    type: String,
    default: "XXXXX",
  },
  noSignature: {
    type: String,
    default: "YYYYY",
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  consulta: {
    type: Schema.Types.ObjectId,
    ref: "Consulta",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
});

ModelSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();

  data.uid = _id;

  return data;
};

module.exports = model("Folio", ModelSchema);
