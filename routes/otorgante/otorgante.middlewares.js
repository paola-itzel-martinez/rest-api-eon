const { check } = require('express-validator')
const { isValidCategoryId } = require('../../helpers')
const { validateFields } = require('..')

const getAll = []

const create = [
    check('name', 'name is required').not().isEmpty(),
    validateFields
]

const update = [
    check('name', 'name is required').not().isEmpty(),
    check('id').custom(isValidCategoryId),
    validateFields
]

const deleteCategory = [
    check('id').custom(isValidCategoryId),
    validateFields
]

module.exports = {
    getAll,
    create,
    update,
    delete: deleteCategory
}
