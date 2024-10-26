import jwt from "jsonwebtoken";

export const ensureAuthenticated = (req, res, next) => {
  


  const authHeader = req.headers["authorization"]; // Get the Authorization header
  // console.log(req.headers)
  // console.log(authHeader, "jii");

  if (!authHeader) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is required" });
  }

  // Ensure the token starts with 'Bearer ' and extract the actual token
  const token = authHeader.split(' ')[1]; // Get only the token part
  // console.log(token, "token");
  if (!token) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Verify the token
    req.user = decoded; // Save the decoded token payload to req.user
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token wrong or expired" });
  }
};
