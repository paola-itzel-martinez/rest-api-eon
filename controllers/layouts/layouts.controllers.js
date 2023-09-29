const { setResponseError } = require("../../helpers");
const { Consulta } = require("../../models");

const getLayouts = async (req, response) => {
  const { otorgante, year } = req.body;

  try {
    const data = await Consulta.find({
      otorgante,
      dateCreated: {
        $gte: new Date(`${year}-01-01T00:00:00.000Z`),
        $lt: new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`),
      },
    })
    .populate("otorgante", ["name"]);

    if (!data) setResponseError({ response, error: "Not found" });

    const dataFormatted = data.map((element) => ({
      otorganteName: element.otorgante.name,
      requestDate: element.dateCreated,
      fileName: `${element._id}.xls`
    }))
  
    response.json(dataFormatted);
  } catch (error) {
    console.log(error)
    setResponseError({ response, error });
  }
};

module.exports = {
  getLayouts
};
