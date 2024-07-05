import express from 'express'
let router = express.Router()
import read_all from '../controllers/categories/read.js'
router.get('/', read_all)
export default router