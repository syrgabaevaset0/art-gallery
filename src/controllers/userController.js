const User = require('../models/User')

const getProfile = async (req, res) => {
  res.json(req.user)
}

const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  user.username = req.body.username || user.username
  user.email = req.body.email || user.email

  const updatedUser = await user.save()

  res.json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    role: updatedUser.role
  })
}

module.exports = {
  getProfile,
  updateProfile
}
