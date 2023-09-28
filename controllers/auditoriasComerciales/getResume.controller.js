const { setResponseError } = require("../../helpers");
const { Consulta } = require("../../models");

const getResume = async ({ query }, response) => {
  const { otorgante } = query;
  const year = Number(query.year);

  try {
    const consultas = await Consulta.find({ otorgante })
      .where("dateCreated")
      .gte(new Date(`${year}-01-01T00:00:00.000Z`))
      .lt(new Date(`${year + 1}-01-01T00:00:00.000Z`))
      .populate("otorgante", ["folio", "name"])
      .populate("status", ["code", "name"]);

    const statusCounts = {};

    consultas.forEach(({ status }) => {
      const { name } = status;

      if (statusCounts[name]) {
        statusCounts[name].total++;
      } else {
        statusCounts[name] = { total: 1, percent: 0 };
      }
    });

    const total = consultas.length;

    const statuses = Object.keys(statusCounts).map((key) => {
      const statusData = statusCounts[key];
      const percent = Number(((statusData.total * 100) / total).toFixed(2));

      return {
        ...statusData,
        name: key,
        percent,
      };
    });

    response.json({
      total,
      statuses,
    });
  } catch (error) {
    return setResponseError({ response, error });
  }
};

module.exports = {
  getResume,
};
