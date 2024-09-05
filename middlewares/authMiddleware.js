const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(401).send({
        message: "No token provided",
        success: false,
      });
    }
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        console.log("JWT verification error", err);
        return res.status(401).send({
          message: "Auth Failed",
          success: false,
        });
      } else {
        req.body.userId = decode.id;
        console.log(req.body.userId);
        next();
      }
    });
  } catch (error) {
    console.log("Error in authentication middleware:", error);
    res.status(500).send({
      message: "Internal server error",
      success: false,
    });
  }
};
