const Artwork = require('../models/Artwork')

const createArtwork = async (req, res) => {
  const { title, description, artist, imageUrl, price } = req.body

  const artwork = await Artwork.create({
    title,
    description,
    artist,
    imageUrl,
    price,
    createdBy: req.user.id
  })

  res.status(201).json(artwork)
}

const getArtworks = async (req, res) => {
  const artworks = await Artwork.find({ createdBy: req.user.id })
  res.json(artworks)
}

const getArtworkById = async (req, res) => {
  const artwork = await Artwork.findById(req.params.id)

  if (!artwork) {
    res.status(404)
    throw new Error('Artwork not found')
  }

  if (
    artwork.createdBy.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    res.status(403)
    throw new Error('Access denied')
  }

  res.json(artwork)
}

const updateArtwork = async (req, res) => {
  const artwork = await Artwork.findById(req.params.id)

  if (!artwork) {
    res.status(404)
    throw new Error('Artwork not found')
  }

  if (
    artwork.createdBy.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    res.status(403)
    throw new Error('Access denied')
  }

  const updated = await Artwork.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.json(updated)
}

const deleteArtwork = async (req, res) => {
  const artwork = await Artwork.findById(req.params.id)

  if (!artwork) {
    res.status(404)
    throw new Error('Artwork not found')
  }

  if (
    artwork.createdBy.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    res.status(403)
    throw new Error('Access denied')
  }

  await artwork.deleteOne()

  res.json({ message: 'Artwork removed' })
}

const getAllArtworksAdmin = async (req, res) => {
  const artworks = await Artwork.find().populate('createdBy', 'username email')
  res.json(artworks)
}

module.exports = {
  createArtwork,
  getArtworks,
  getArtworkById,
  updateArtwork,
  deleteArtwork,
  getAllArtworksAdmin
}
