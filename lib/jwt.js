import jwt from "jsonwebtoken";

// A login token is a small signed note that says "this browser is logged in as
// user X". The signature is made with JWT_SECRET, so nobody without the secret
// can forge one.
//
// HS256 is the one signature type this app uses. Locking it on both signing and
// checking means a token that claims any other type is refused outright.
const ALGORITHM = "HS256";

// Read the secret when it is used (not when the file loads) so the build never
// needs it, but every real sign-in or check fails loudly if it is missing.
function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is required");
  }
  return secret;
}

export function signToken(payload) {
  return jwt.sign(payload, getSecret(), {
    expiresIn: "7d",
    algorithm: ALGORITHM,
  });
}

export function verifyToken(token) {
  return jwt.verify(token, getSecret(), { algorithms: [ALGORITHM] });
}
