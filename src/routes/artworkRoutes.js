const express = require('express')
const router = express.Router()
const {
  createArtwork,
  getArtworks,
  getArtworkById,
  updateArtwork,
  deleteArtwork,
  getAllArtworksAdmin
} = require('../controllers/artworkController')
const { protect } = require('../middleware/authMiddleware')
const authorize = require('../middleware/roleMiddleware')
const validate = require('../middleware/validateMiddleware')
const { artworkSchema } = require('../validators/artworkValidator')

router.post('/', protect, validate(artworkSchema), createArtwork)

router.get('/', protect, getArtworks)

router.get('/admin/all', protect, authorize('admin'), getAllArtworksAdmin)

router.get('/:id', protect, getArtworkById)

router.put('/:id', protect, updateArtwork)

router.delete('/:id', protect, deleteArtwork)

module.exports = router
