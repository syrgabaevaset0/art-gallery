const Artwork = require('../models/Artwork');

exports.createArtwork = async (req, res, next) => {
  try {
    const { title, description, imageUrl, artist, year, price } = req.body;

    const artwork = await Artwork.create({
      title,
      description,
      imageUrl,
      artist,
      year,
      price,
      createdBy: req.user._id
    });

    res.status(201).json(artwork);
  } catch (error) {
    next(error);
  }
};

exports.getArtworks = async (req, res, next) => {
  try {
    const artworks = await Artwork.find({ createdBy: req.user._id });
    res.json(artworks);
  } catch (error) {
    next(error);
  }
};

exports.getArtworkById = async (req, res, next) => {
  try {
    const artwork = await Artwork.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }

    res.json(artwork);
  } catch (error) {
    next(error);
  }
};

exports.updateArtwork = async (req, res, next) => {
  try {
    const artwork = await Artwork.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }

    artwork.title = req.body.title || artwork.title;
    artwork.description = req.body.description || artwork.description;
    artwork.imageUrl = req.body.imageUrl || artwork.imageUrl;
    artwork.artist = req.body.artist || artwork.artist;
    artwork.year = req.body.year || artwork.year;
    artwork.price = req.body.price || artwork.price;

    const updatedArtwork = await artwork.save();

    res.json(updatedArtwork);
  } catch (error) {
    next(error);
  }
};

exports.deleteArtwork = async (req, res, next) => {
  try {
    const artwork = await Artwork.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }

    await artwork.deleteOne();

    res.json({ message: 'Artwork removed' });
  } catch (error) {
    next(error);
  }
};
