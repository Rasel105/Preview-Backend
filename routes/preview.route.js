const express = require("express");
const router = express.Router();
const previewController = require('../controllers/preview.controller');

router.route('/')
    .get(previewController.getAllPreview)
    .post(previewController.createPreview)

router.route('/:id')
    .patch(previewController.updatePreviewById)
    .delete(previewController.deletePreviewById)

module.exports = router;
