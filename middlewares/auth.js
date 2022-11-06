const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    console.log(
      new Date().toLocaleDateString(),
      new Date().toLocaleTimeString(),
      req.url
    );
    if (Object.keys(req.body).length > 0) {
      console.log(JSON.stringify(req.body));
    }
    const token = req.header("x-auth-token");

    if (!token)
      return res.status(401).json({ msg: "No auth token, access denied." });

    const verified = jwt.verify(token, "passwordKey");

    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });

    req.user = verified.id;
    req.token = token;
    next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = auth;
