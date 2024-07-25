import express from 'express'
import read_all from '../controllers/categories/read.js'

let router = express.Router()
router.get('/', read_all)
export default router