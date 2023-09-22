const { setResponseError } = require("../helpers");
const { ConsultaEstatuses } = require("../models");

const VALUE_NOT_UPDATED_ERROR = {
  code: 500,
  error: "value not updated",
};

const getAll = async (request, response) => {
  const { limit = 10, skip = 0, status = true } = request.query;

  try {
    const data = await ConsultaEstatuses.find({ status });

    response.json({ data });
  } catch (error) {
    return setResponseError({ response, error });
  }
};

const create = async ({ body }, response) => {
  try {
    const name = body.name.toUpperCase();
    const exists = await ConsultaEstatuses.findOne({ name });

    if (exists) {
      return setResponseError({
        response,
        error: "value already exists",
      });
    }

    const data = new ConsultaEstatuses({
      name,
      code: body.code,
    });

    await data.save(data);

    response.json({ data });
  } catch (error) {
    return setResponseError({ response, error });
  }
};

const update = async (request, response) => {
  const { id } = request.params;
  const name = request.body.name.toUpperCase();

  try {
    const data = await ConsultaEstatuses.findByIdAndUpdate(id, { name }, { new: true });

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

    const category = await ConsultaEstatuses.findByIdAndUpdate(id, { status: false });

    response.json({ category });
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
