const express = require("express");
const router = express.Router();
const fileController = require("../controller/file.controller");

const buffer = require('../middleware/buffer.middleware')

router.get("download/:filename", fileController.GetFile);
router.post("/:filename", buffer, fileController.PostFile);
router.delete('/', fileController.DeleteFiles);
router.get("/all", fileController.GetAllFilesFromMongo);

module.exports = router;
