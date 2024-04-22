const { Users } = require('../db');
const { issueJWT } = require('../utils/passport-auth/utils');
const catchAsync = require('../utils/general/catchAsync');

// Passport JWT + Auth0
const authLogin = catchAsync(async (req, res) => {
  const phone = req.body?.phone || '';

  // check if user exists
  let user = await Users.findOne({
    where: {
      phone,
    },
    raw: true,
  });

  if (!user) {
    try {
      // Creating a new user
      user = await Users.create({
        name: req.body.name || '',
        phone,
      });
    } catch (e) {
      return res.status(403).json({ error: 'Something went wrong' });
    }
  }

  const jwt = issueJWT(user);

  return res.json({
    success: true,
    accessToken: jwt.token,
  });
});

const sendVerifySms = catchAsync(async (req, res) => {
  const phone = req.body?.phone || '';
  const otp = Math.floor(Math.random() * 1000000);
  console.log(`phone: ${phone}, ${otp}`);

  // send sms to phone

  return res.json({
    data: {
      otp,
    },
    success: true,
  });
});

module.exports = {
  authLogin,
  sendVerifySms,
};
