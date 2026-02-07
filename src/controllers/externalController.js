const axios = require('axios')

const searchExternalArtworks = async (req, res, next) => {
  try {
    const query = req.query.query || 'painting'

    const searchResponse = await axios.get(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`
    )

    const objectIDs = searchResponse.data.objectIDs

    if (!objectIDs || objectIDs.length === 0) {
      return res.json([])
    }

    const limitedIDs = objectIDs.slice(0, 5)

    const artworks = await Promise.all(
      limitedIDs.map(async (id) => {
        const detailResponse = await axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        )

        return {
          title: detailResponse.data.title,
          artist: detailResponse.data.artistDisplayName,
          image: detailResponse.data.primaryImageSmall,
          date: detailResponse.data.objectDate
        }
      })
    )

    res.json(artworks)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  searchExternalArtworks
}
