const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const restricted = require("../middleware/restricted");

router.get("/images", restricted, async (req, res) => {
  const imageArr = fs.readdirSync(path.join(__dirname, "../../public/images"));

  const images = await Promise.all(
    imageArr.map(async (image) => {
      const base64 = await localImageToBase64(
        path.join(__dirname, "../../public/images", image)
      );
      return { name: image, base64 };
    })
  );

  res.json(images);
});

module.exports = router;

function localImageToBase64(localImage) {
  return new Promise((resolve, reject) =>
    fs.readFile(localImage, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString("base64"));
      }
    })
  );
}
