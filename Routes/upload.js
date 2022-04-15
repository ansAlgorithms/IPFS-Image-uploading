const router = require('express').Router()
const ipfs = require('../Controller/ipfs')


router.post('/upload/',  ipfs.upload)

module.exports = router