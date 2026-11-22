const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((e) => e.message).join(', ');
    return res.status(400).json({ success: false, message });
  }
  if (err.code === 11000) {
    return res.status(409).json({ success: false, message: 'Duplicate SKU' });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: 'Invalid id format' });
  }
  res.status(500).json({ success: false, message: err.message || 'Server error' });
};

module.exports = errorHandler;
