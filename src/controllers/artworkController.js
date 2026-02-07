const Artwork = require('../models/Artwork')

const createArtwork = async (req, res, next) => {
  try {
    const { title, description, artist, imageUrl, price } = req.body

    const artwork = await Artwork.create({
      title,
      description,
      artist,
      imageUrl,
      price,
      createdBy: req.user._id
    })

    res.status(201).json(artwork)
  } catch (error) {
    next(error)
  }
}

const getArtworks = async (req, res, next) => {
  try {
    const artworks = await Artwork.find({ createdBy: req.user._id })
    res.json(artworks)
  } catch (error) {
    next(error)
  }
}

const getArtworkById = async (req, res, next) => {
  try {
    const artwork = await Artwork.findById(req.params.id)

    if (!artwork) {
      res.status(404)
      throw new Error('Artwork not found')
    }

    if (artwork.createdBy.toString() !== req.user._id.toString()) {
      res.status(401)
      throw new Error('Not authorized')
    }

    res.json(artwork)
  } catch (error) {
    next(error)
  }
}

const updateArtwork = async (req, res, next) => {
  try {
    const artwork = await Artwork.findById(req.params.id)

    if (!artwork) {
      res.status(404)
      throw new Error('Artwork not found')
    }

    if (artwork.createdBy.toString() !== req.user._id.toString()) {
      res.status(401)
      throw new Error('Not authorized')
    }

    artwork.title = req.body.title || artwork.title
    artwork.description = req.body.description || artwork.description
    artwork.artist = req.body.artist || artwork.artist
    artwork.imageUrl = req.body.imageUrl || artwork.imageUrl
    artwork.price = req.body.price || artwork.price

    const updatedArtwork = await artwork.save()

    res.json(updatedArtwork)
  } catch (error) {
    next(error)
  }
}

const deleteArtwork = async (req, res, next) => {
  try {
    const artwork = await Artwork.findById(req.params.id)

    if (!artwork) {
      res.status(404)
      throw new Error('Artwork not found')
    }

    if (artwork.createdBy.toString() !== req.user._id.toString()) {
      res.status(401)
      throw new Error('Not authorized')
    }

    await artwork.deleteOne()

    res.json({ message: 'Artwork removed' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createArtwork,
  getArtworks,
  getArtworkById,
  updateArtwork,
  deleteArtwork
}
