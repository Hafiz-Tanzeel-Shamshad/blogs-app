import jwt from "jsonwebtoken";

export const varityUser = (req, res, next) => {
  const token = req.cookies.access_token;
  try {
    if (!token) return res.json({ msg: "unautorized access" }).status(400);

    jwt.verify(token, process.env.JWT_SECRET, (err, id) => {
      if (err) return res.json({ msg: "invalid token" }).status(400);
      console.log(id);
      req.user = id;
      
    });
    next();
  } catch (error) {
    console.log("auth middileware err");
  }
};
