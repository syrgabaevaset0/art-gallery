const mongoose = require('mongoose')

const artworkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    artist: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Artwork', artworkSchema)
