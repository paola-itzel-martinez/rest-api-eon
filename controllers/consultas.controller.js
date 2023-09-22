const { setResponseError } = require("../helpers");
const { Consulta } = require("../models");

const VALUE_NOT_UPDATED_ERROR = {
  code: 500,
  error: "value not updated",
};

const getAll = async (request, response) => {
  const { limit = 10, skip = 0, isActive = true } = request.query;

  try {
    const data = await Consulta.find({ isActive })
      .populate("otorgante", ["name"])
      .populate("status", "name");

    response.json({ data });
  } catch (error) {
    return setResponseError({ response, error });
  }
};

const create = async ({ body }, response) => {
  const { status, month, recordsToCreate } = body;

  //auditada 650d3aac8b7a21ba416ec45a
  // 01, 07 - 10
  // 02, 08 - 20
  // 03, 09 - 15
  // 04, 10 - 24
  // 05, 11 - 5
  // 06, 12 - 26

  //onTime 650d3abc8b7a21ba416ec45d
  // 01, 07 - 2
  // 02, 08 - 4
  // 03, 09 - 3
  // 04, 10 - 5
  // 05, 11 - 1
  // 06, 12 - 5

  //pending 650d3ac78b7a21ba416ec460
  // 01, 07 - 4
  // 02, 08 - 8
  // 03, 09 - 6
  // 04, 10 - 10
  // 05, 11 - 3
  // 06, 12 - 10

  //outDated 650d3adc8b7a21ba416ec463
  // 01, 07 - 2
  // 02, 08 - 0
  // 03, 09 - 5
  // 04, 10 - 3
  // 05, 11 - 3
  // 06, 12 - 1

  try {
    for (let i = 0; i < recordsToCreate; i++) {
      for (let year = 2022; year < 2024; year++) {
        const c0001_s1 = new Consulta({
          otorgante: "650d32355547d5ce52b3e477",
          status,
          dateCreated: new Date(year, month - 1, 22),
        });

        const c0001_s2 = new Consulta({
          otorgante: "650d32355547d5ce52b3e477",
          status,
          dateCreated: new Date(year, month + 5, 22),
        });

        const c0002_s1 = new Consulta({
          otorgante: "650d32665547d5ce52b3e47b",
          status,
          dateCreated: new Date(year, month - 1, 22),
        });

        const c0002_s2 = new Consulta({
          otorgante: "650d32665547d5ce52b3e47b",
          status,
          dateCreated: new Date(year, month + 5, 22),
        });

        const c0003_s1 = new Consulta({
          otorgante: "650d32775547d5ce52b3e47e",
          status,
          dateCreated: new Date(year, month - 1, 22),
        });

        const c0003_s2 = new Consulta({
          otorgante: "650d32775547d5ce52b3e47e",
          status,
          dateCreated: new Date(year, month + 5, 22),
        });

        await c0001_s1.save(c0001_s1);
        await c0001_s2.save(c0001_s2);
        await c0002_s1.save(c0002_s1);
        await c0002_s2.save(c0002_s2);
        await c0003_s1.save(c0003_s1);
        await c0003_s2.save(c0003_s2);
      }
    }

    response.json({ code: 200 });
  } catch (error) {
    return setResponseError({ response, error });
  }
};

const update = async ({ body }, response) => {
  const { id } = request.params;
  const { status } = body;

  try {
    const data = await Consulta.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (data) return response.json({ data });

    setResponseError({
      response,
      error: VALUE_NOT_UPDATED_ERROR,
    });
  } catch (error) {
    return setResponseError({ response, error });
  }
};

const deleteValue = async (request, response) => {
  try {
    const { id } = request.params;

    const data = await Consulta.findByIdAndUpdate(id, { isActive: false });

    response.json({ data });
  } catch (error) {
    return setResponseError({ response, error });
  }
};

module.exports = {
  getAll,
  create,
  update,
  delete: deleteValue,
};
