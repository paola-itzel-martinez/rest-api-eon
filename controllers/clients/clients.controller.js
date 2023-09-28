const { request } = require("express");
const { setResponseError } = require("../../helpers");
const { Client } = require("../../models");

const getAll = async (req, response) => {
  const { limit = 10, skip = 0, status = true } = req.query;

  const [total, data] = await Promise.all([
    Client.countDocuments({ status }),
    Client.find({ status }).limit(Number(limit)).skip(Number(skip)),
  ]);

  response.json({ total, data });
};

const create = async (req = request, response) => {
  const { name, rfc } = req.body;

  try {
    const data = new Client({ name, rfc });

    await data.save(data);

    response.json(data);
  } catch (error) {
    return setResponseError({ response, error });
  }
};

module.exports = {
  getAll,
  create,
};
