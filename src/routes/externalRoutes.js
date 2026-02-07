const express = require('express')
const router = express.Router()
const { searchExternalArtworks } = require('../controllers/externalController')

router.get('/artworks', searchExternalArtworks)

module.exports = router
