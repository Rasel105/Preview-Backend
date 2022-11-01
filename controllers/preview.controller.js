const { getPreviewService, createPreviewService, updatePreviewByIdService, deletePreviewByIdService } = require("../services/preview.services");

exports.getAllPreview = async (req, res, next) => {
    try {
        const previews = await getPreviewService();

        res.status(200).json({
            status: "Success",
            data: previews,
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Can't get data",
            error: error.message
        })
    }
};

exports.createPreview = async (req, res, next) => {
    try {
        // Save and create 
        const result = await createPreviewService(req.body);

        result.logger();

        res.status(200).json({
            status: "Success",
            message: "Data inserted successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Data is not inserted",
            error: error.message,
        })
    }
};

exports.updatePreviewById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updatePreviewByIdService(id, req.body);
        res.status(200).json({
            status: "Success",
            message: "Data updated successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Coudn't update the product",
            error: error.message,
        })
    }
};

exports.deletePreviewById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deletePreviewByIdService(id);

        if (!result.deletedCount) {
            return res.status(400).json({
                status: "Failed",
                error: "Coudn't delete the product"
            })
        }

        res.status(200).json({
            status: "Success",
            message: "Data deleted successfully",
            data: result,
        })

    } catch (error) {
        res.status(400).json({
            status: "Failded",
            message: "Couldn't delete the product",
            error: error.message,
        })
    }
}