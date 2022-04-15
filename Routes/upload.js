const router = require('express').Router()
const ipfs = require('../Controller/ipfs')

router.post('/', ipfs.upload)

module.exports = router