const asyncHandler = require('express-async-handler');

const getInfoHandler = asyncHandler(async (req, res) => {
  res.json({ message: 'Hi!' });
}
);

module.exports = { getInfoHandler };