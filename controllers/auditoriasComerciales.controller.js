const { ObjectId } = require("mongoose").Types;
const { setResponseError } = require("../helpers");
const { Consulta } = require("../models");

const populateConsulta = (query) => {
  return query
    .populate("otorgante", ["name", "folio"])
    .populate("status", ["name", "code"]);
};

const getResume = async ({ body }, response) => {
  const { otorgante, year } = body;

  try {
    const consultas = await Consulta.find({ otorgante })
      .where("dateCreated")
      .gte(new Date(`${year}-01-01T00:00:00.000Z`))
      .lt(new Date(`${year + 1}-01-01T00:00:00.000Z`))
      .populate("otorgante", ["folio", "name"])
      .populate("status", ["code", "name"]);

    const statusCounts = {};

    consultas.forEach((data) => {
      const { code } = data.status;

      if (statusCounts[code]) {
        statusCounts[code].total++;
      } else {
        statusCounts[code] = { total: 1, percent: 0 };
      }
    });

    const totalConsultas = consultas.length;

    for (const code in statusCounts) {
      if (statusCounts.hasOwnProperty(code)) {
        statusCounts[code].percent = (
          (statusCounts[code].total / totalConsultas) *
          100
        ).toFixed(2);
      }
    }

    response.json({
      totalConsultas,
      statusCounts,
    });
  } catch (error) {
    return setResponseError({ response, error });
  }
};

module.exports = {
  getResume,
};
