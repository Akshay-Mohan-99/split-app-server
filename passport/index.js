const { getPubKey } = require('../utils/passport-auth/utils');

const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStratergy = require('passport-jwt').Strategy;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: getPubKey(),
  algorithms: ['RS256'],
};

const strategy = new JwtStratergy(options, (payload, done) => {
  return done(null, payload);
});

module.exports = (passport) => {
  passport.use(strategy);
};
