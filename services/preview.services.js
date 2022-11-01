const Preview = require("../models/Preview");

exports.getPreviewService = async () => {
    const previews = await Preview.find({});
    return previews;
}

exports.createPreviewService = async (data) => {
    const preview = await Preview.create(data);
    return preview;
}

exports.updatePreviewByIdService = async (productId, data) => {
    const preview = await Preview.findById(productId);
    const result = await preview.set(data).save();
    return result;
};

exports.deletePreviewByIdService = async (id) => {
    const result = await Preview.deleteOne({ _id: id });
    return result;
}