const express = require("express");
const previewController = require("../controllers/preview.controller");

const router = express.Router();

router
    .route('/')
    .get(previewController.getAllPreview)

router
    .route("/:id")
    .get(previewController.getAPreview)
    .patch(previewController.updatePreview)
    .delete(previewController.deletePreview)

module.exports = router;