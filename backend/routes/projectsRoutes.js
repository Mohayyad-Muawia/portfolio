const express = require('express')
const { get_project, all_projects, update_project, delete_project, sign, contact } = require('../controllers/projectsController')

const router = express.Router()

router.get('/', all_projects)
router.get('/:id', get_project)
router.delete('/:id', delete_project)
router.patch('/:id', update_project)
router.post('/sign', sign)
router.post('/contact', contact)

module.exports = router