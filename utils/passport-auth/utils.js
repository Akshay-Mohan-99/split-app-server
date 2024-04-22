const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');

// const pathToKey = path.join(__dirname, '..', 'passport-auth/id_rsa_priv.pem');
const PRIV_KEY = process.env.PASSPORT_PRIVATE_KEY; // fs.readFileSync(pathToKey, 'utf8');
// const pathToKeyPubKey = path.join(
//   __dirname,
//   '..',
//   'passport-auth/id_rsa_pub.pem'
// );
const PUB_KEY = process.env.PASSPORT_PUBLIC_KEY; // fs.readFileSync(pathToKeyPubKey, 'utf8');

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 * @param {*} user - The portal_user object.  We need this to set the JWT `auth.payload`  property to the auth0 payload
 */
function issueJWT(user) {
  // auth token payload
  const payload = {
    firstName: user?.name,
    lastName: user?.name,
    id: user?.id,
    iat: Math.floor(Date.now() / 1000),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    algorithm: 'RS256',
  });

  return {
    token: signedToken,
  };
}

/**
 * Returns Public Key
 */
function getPubKey() {
  return PUB_KEY;
}

module.exports = {
  issueJWT,
  getPubKey,
};
