const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file.controller");

const buffer = require('../middlewares/buffer.middleware')

router.get("/:filename", fileController.GetFile);
router.post("/:filename", buffer, fileController.PostFile);
router.delete('/', fileController.DeleteFiles);
router.get("/all", fileController.GetAllFilesFromMongo);

module.exports = router;
