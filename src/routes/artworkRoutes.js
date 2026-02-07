const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createArtwork,
  getArtworks,
  getArtworkById,
  updateArtwork,
  deleteArtwork
} = require('../controllers/artworkController');
const validate = require('../middleware/validateMiddleware');
const { artworkSchema } = require('../validators/artworkValidator');

router.post('/', protect, validate(artworkSchema), createArtwork);
router.get('/', protect, getArtworks);
router.get('/:id', protect, getArtworkById);
router.put('/:id', protect, updateArtwork);
router.delete('/:id', protect, deleteArtwork);

module.exports = router;
