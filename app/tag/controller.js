const Tags = require('./model');


const store = async (req, res, next) => {
    try {
        let payload = req.body;
        let tags = new Tags(payload);
        await tags.save();
        return res.json(tags);
    } catch(err) {
        if (err && err.name === "ValidationError") {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }

        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        let payload = req.body;
        let tags = await Tags.findByIdAndUpdate(req.params.id, payload, {new:true, runValidator:true});
        return res.json(tags)
    } catch(err) {
        if (err && err.name === "ValidationError") {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }

        next(err);
    }
}

const destroy = async (req, res, next) => {
    try {
        let tags = await Tags.findByIdAndDelete(req.params.id);
        return res.json(tags);
    } catch(err) {
        if (err && err.name === "ValidationError") {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }

        next(err);
    }
}

const index = async (req, res, next) => {
    try {
        let tags = await Tags.find();
        return res.json(tags)
    } catch(err) {
        if (err && err.name === "ValidationError") {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }

        next(err);
    }
}

module.exports = {
    store,
    update,
    destroy,
    index
}