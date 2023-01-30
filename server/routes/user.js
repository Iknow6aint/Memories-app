import express from 'express'

import { } from '../controllers/user.js'

const router = express.Router()

router.post('/signin', sigin)
router.post('/signin', sigup)

export default router;