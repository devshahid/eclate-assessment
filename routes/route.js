const express = require("express");
const multer = require("multer");
const router = express.Router();
const fs = require("fs");
const createUser = require("../controllers/createUser");
const getUserDetails = require("../controllers/getUserDetails");
const deleteEntity = require("../controllers/deleteEntity");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directory = `./uploads/${req.params.entity_name}`;

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    cb(null, directory);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    if (req.params.id !== undefined) {
      cb(null, `${Date.now()}-${req.params.id}.${ext}`);
    } else {
      cb(null, `${Date.now()}.${ext}`);
    }
  },
});

const multerFilter = (req, file, cb) => {
  if (file.originalname.match(/\.(png|jpg)$/)) {
    cb(null, true);
  } else {
    cb(new Error("Not a Png or JPG File!!"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

router.get("/", (req, res) => {
  res.send(`Server is Running at ${process.env.PORT}`);
});

router.post("/upload/:entity_name", upload.single("image"), (req, res) => {
  console.log("working");
  res.send(req.file);
});

router.post("/upload/:entity_name/:id", upload.single("image"), (req, res) => {
  console.log("working");
  console.log(req.params.id);
  res.send(req.file);
});

router.post("/create-user", createUser);

router.get("/getusers", getUserDetails);

router.delete("/delete/:entity_name", deleteEntity);

module.exports = router;
