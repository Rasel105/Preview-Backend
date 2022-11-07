const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

module.exports.getAllPreview = async (req, res, next) => {
    try {
        const db = getDb();
        const previews = await db
            .collection("previews")
            .find({})
            .toArray();

        res.status(200).json({ success: true, data: previews });

    } catch (error) {
        next(error)
    }
};

module.exports.saveAPreview = async (req, res, next) => {
    try {
        const db = getDb();
        const preview = req.body;
        const result = await db.collection("new-preview").insertOne(preview);
        if (!result.insertedId) {
            return res.status(400).send({ status: false, error: "Something went wrong" });
        }
        res.send({
            success: true,
            message: `Preview added with id: ${result.insertedId}`
        })
    } catch (error) {
        next(error);
    }
};

module.exports.getAPreview = async (req, res, next) => {
    try {
        const db = getDb();
        const { id } = req.params;
        console.log(id);
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "NOT a valid preview ID" })
        }
        const preview = await db.collection("previews").findOne({ _id: ObjectId(id) });
        if (!preview) {
            return res.status(400).json({ success: false, error: "Couldn't find preview with this ID" })
        }
        res.status(200).json({ success: true, data: preview });

    } catch (error) {
        next(error)
    }
};


module.exports.getSavedPreview = async (req, res, next) => {
    try {
        const db = getDb();
        const email = req.params;
        const preview = await db
            .collection("new-preview")
            .find(email)
            .toArray();

        res.status(200).json({ success: true, data: preview });
        res.send(data);
    } catch (error) {
        next(error);
    }
};


module.exports.updatePreview = async (req, res, next) => {
    try {
        const db = getDb();
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "NOT a valid priview ID" })
        }
        const tool = await db.collection("previews").updateOne({ _id: ObjectId(id) }, { $set: req.body });
        if (!tool.modifiedCount) {
            return res.status(400).json({ success: false, error: "Couldn't update the preview" })
        }
        res.status(200).json({ success: true, message: "Successfully updated the preview" });

    } catch (error) {
        next(error)
    }
};

module.exports.deletePreview = async (req, res, next) => {
    try {
        const db = getDb();
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "NOT a valid preview ID" })
        }
        const preview = await db.collection("new-preview").deleteOne({ _id: ObjectId(id) });

        if (!preview.deletedCount) {
            return res.status(400).json({ success: false, error: "Couldn't delete the preview" })
        }
        res.status(200).json({ success: true, message: "Succefully deleted the preview" });

    } catch (error) {
        next(error)
    }
};
