const express = require('express')
const router = express.Router()
const {
  createArtwork,
  getArtworks,
  getArtworkById,
  updateArtwork,
  deleteArtwork
} = require('../controllers/artworkController')
const { protect } = require('../middleware/authMiddleware')
const validate = require('../middleware/validateMiddleware')
const { artworkSchema } = require('../validators/artworkValidator')

/**
 * @swagger
 * tags:
 *   name: Artworks
 *   description: Artwork management endpoints
 */

/**
 * @swagger
 * /api/artworks:
 *   post:
 *     summary: Create new artwork
 *     tags: [Artworks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - artist
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               artist:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Artwork created successfully
 */
router.post('/', protect, validate(artworkSchema), createArtwork)

/**
 * @swagger
 * /api/artworks:
 *   get:
 *     summary: Get all artworks of current user
 *     tags: [Artworks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of artworks
 */
router.get('/', protect, getArtworks)

/**
 * @swagger
 * /api/artworks/{id}:
 *   get:
 *     summary: Get artwork by ID
 *     tags: [Artworks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Artwork found
 *       404:
 *         description: Artwork not found
 */
router.get('/:id', protect, getArtworkById)

/**
 * @swagger
 * /api/artworks/{id}:
 *   put:
 *     summary: Update artwork
 *     tags: [Artworks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Artwork updated
 */
router.put('/:id', protect, updateArtwork)

/**
 * @swagger
 * /api/artworks/{id}:
 *   delete:
 *     summary: Delete artwork
 *     tags: [Artworks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Artwork deleted
 */
router.delete('/:id', protect, deleteArtwork)

module.exports = router
