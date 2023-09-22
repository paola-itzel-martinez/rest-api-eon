const { setResponseError } = require('../helpers')
const { Otorgante } = require('../models')

const OTORGANTE_NOT_UPDATED_ERROR = {
  code: 500,
  error: "otorgante not updated"
}

const getAll = async(request, response) => {
  const {
    limit = 10,
    skip = 0,
    status = true
  } = request.query

  try {
    const [total, data] = await Promise.all([
      Otorgante.countDocuments({ status }),
      Otorgante.find({ status })
        .limit(Number(limit))
        .skip(Number(skip))
    ])
  
    response.json({ total, data })
  } catch (error) {
    return setResponseError({ response, error })
  }
}

const create = async(request, response) => {
  try {
    const name = request.body.name.toUpperCase()
    const exists = await Otorgante.findOne({ name })
  
    if (exists) return setResponseError({ response, error: 'Otorgante already exists' })

    const otorgante = new Otorgante({
      name
    })

    await otorgante.save(otorgante)

    response.json({ otorgante })
  } catch (error) {
    return setResponseError({ response, error })
  }
}

const update = async(request, response) => {
  const { id } = request.params
  const name = request.body.name.toUpperCase()

  try {
    const data = await Otorgante
      .findByIdAndUpdate(id, { name }, { new: true })

    if (data) return response.json({ data })

    setResponseError({
      response,
      error: OTORGANTE_NOT_UPDATED_ERROR
    })
  } catch (error) {
    return setResponseError({ response, error })
  }
}

const deleteOtorgante = async(request, response) => {
  try {
    const { id } = request.params

    const category = await Otorgante
      .findByIdAndUpdate(id, { status: false })
  
    response.json({ category })
  } catch (error) {
    return setResponseError({ response, error })
  }
}

module.exports = {
  getAll,
  create,
  update,
  delete: deleteOtorgante,
}
