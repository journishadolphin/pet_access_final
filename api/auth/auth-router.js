const router = require("express").Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "shh";

const Auth = require("./auth-model");

router.post("/register", async (req, res) => {
  let user = req.body.user;
  if (!user.username || !user.password) {
    return res.status(400).json({ message: "Username and Password required" });
  }

  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  try {
    const saved = await Auth.add(user);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body.user;

  try {
    await Auth.findBy({ username }).then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome back ${user.username}`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

module.exports = router;
