const express = require("express");
const previewController = require("../controllers/preview.controller");

const router = express.Router();

router
    .route('/')
    .post(previewController.saveAPreview);

router
    .route("/:email")
    .get(previewController.getSavedPreview)
router
    .route("/:id")
    .delete(previewController.deletePreview)

module.exports = router;