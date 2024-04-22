function catchAsync (fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((error) => {
      console.log({ error })
      next(error)
    })
  }
}

module.exports = catchAsync
