const fs = require("fs");
const path = require("path");
const { request } = require("express");
const { setResponseError } = require("../../helpers");
const { Folio, Consulta } = require("../../models");
const pdf = require("./pdf64");
const imagen = require("./img64");

const getAll = async (req, response) => {
  const { limit = 10, skip = 0, status = true } = req.query;

  const [total, data] = await Promise.all([
    Folio.countDocuments({ status }),
    Folio.find({ status })
      .populate("user", ["name"])
      .populate("client", ["name", "rfc"])
      .populate({
        path: "consulta",
        populate: {
          path: "otorgante",
          model: "Otorgante",
          select: "name folio",
        },
      }),
  ]);

  response.json({ total, data });
};

const getById = async (req, response) => {
  const { id } = req.params;

  const data = await Folio.findById(id)
    .populate("user", ["name"])
    .populate("client", ["name", "rfc"])
    .populate({
      path: "consulta",
      populate: [
        {
          path: "otorgante",
          model: "Otorgante",
          select: "name folio",
        },
        {
          path: "status",
          model: "ConsultaEstatus",
          select: "name code",
        },
      ],
    });

  if (!data) setResponseError({ response, error: "Not found" });

  const dataFormatted = {
    file: data.file,
    docId: data._id,
    productType: data.productType,
    folioCC: data._id,
    noSignature: data.noSignature,
    otorganteName: data.consulta.otorgante.name,
    clientName: data.client.name,
    requestDate: data.consulta.dateCreated,
    user: data.user._id,
    status: data.consulta.status.name,
    folioOtorgante: data.consulta.otorgante._id,
    productType: data.productType,
    expedientType: data.expedientType,
    rfc: data.client.rfc,
  };

  response.json(dataFormatted);
};

const getFileById = async (req, response) => {
  const { id } = req.params;

  const data = await Folio.findById(id);

  if (!data) setResponseError({ response, error: "Not found" });

  response.json({ data: data.file });
};

const create = async (req = request, response) => {
  const newData = req.body;

  try {
    //const file = image;
    const file = pdf;

    const data = new Folio({ ...newData, file });

    await data.save(data);

    response.json(data);
  } catch (error) {
    return setResponseError({ response, error });
  }
};

const searchData = async (req, response) => {
  const { folio, status, otorgante } = req.body;
  let data = null;

  if (folio !== "") {
    data = await Folio.findById(folio)
      .populate("user", ["name"])
      .populate("client", ["name", "rfc"])
      .populate({
        path: "consulta",
        populate: [
          {
            path: "otorgante",
            model: "Otorgante",
            select: "name folio",
          },
          {
            path: "status",
            model: "ConsultaEstatus",
            select: "name code",
          },
        ],
      });
  } else {
    const consultas = await Consulta.find({ otorgante });
    data = await Folio.find({
      consulta: { $in: consultas.map((c) => c._id) },
    })
      .populate("user", ["name"])
      .populate("client", ["name", "rfc"])
      .populate({
        path: "consulta",
        populate: [
          {
            path: "otorgante",
            model: "Otorgante",
            select: "name folio",
          },
          {
            path: "status",
            model: "ConsultaEstatus",
            select: "name code",
          },
        ],
      });
  }

  if (!data) setResponseError({ response, error: "Not found" });

  let dataFormatted;

  if (folio !== "") {
    dataFormatted = [
      {
        file: data.file ? true : false,
        docId: data._id,
        productType: data.productType,
        folioCC: data._id,
        noSignature: data.noSignature,
        otorganteName: data.consulta.otorgante.name,
        clientName: data.client.name,
        requestDate: data.consulta.dateCreated,
        user: data.user._id,
        status: data.consulta.status.name,
        folioOtorgante: data.consulta.otorgante._id,
        productType: data.productType,
        expedientType: data.expedientType,
        rfc: data.client.rfc,
      },
    ];
  } else {
    console.log(data);
    dataFormatted = data.map((element) => ({
      file: element.file ? true : false,
      docId: element._id,
      productType: element.productType,
      folioCC: element._id,
      noSignature: element.noSignature,
      otorganteName: element.consulta.otorgante.name,
      clientName: element.client.name,
      requestDate: element.consulta.dateCreated,
      user: element.user._id,
      status: element.consulta.status.name,
      folioOtorgante: element.consulta.otorgante._id,
      productType: element.productType,
      expedientType: element.expedientType,
      rfc: element.client.rfc,
    }));
  }

  response.json(dataFormatted);
};

module.exports = {
  getAll,
  getById,
  getFileById,
  create,
  search: searchData,
};
