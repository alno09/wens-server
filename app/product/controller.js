const path = require('path');
const fs = require('fs');
const config = require('../config');
const Product = require('./model');
const Category = require('../category/model');

const store = async (req, res, next) => {
    try {
        let payload = req.body;

        // update karena relasi dengan kategori
        if (payload.category) {
            let category = await Category.findOne({name: {$regex: payload.category, $option: 'i'}});
        } else {
            delete payload.category;
        }

        if(req.file) {
            let tmp_path = req.file.path;
            let originalExt = req.file.originalName.split('.')[req.file.originalName.split('.').length - 1];
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootpath, `public/images/products/${filename}`);

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            src.on('end', async () => {
                try {
                    let product = new Product({...payload, image_url: filename});
                    await product.save();
                    return res.json(product);
                } catch(err) {
                    fs.unlink(target_path);
                    if (err && err.name === "ValidationError") {
                        return res.json({
                            error: 1,
                            message: err.message,
                            fields: err.errors
                        })
                    }

                    next(err);
                }
            });

            src.on('error', async() => {
                next(err)
            });

        } else {
            let product = new Product(payload);
            await product.save();
            return res.json(product);
        }
    } catch(err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: error.message,
                field: err.errors
            });
        }
        next(err)
    }
}

const index = async(req, res, next) => {
    try {
        let { skip=0, limit=10 } = req.query;
        let product = await Product
        .find()
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .populate('Category');
        return res.json(product);
    } catch(err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        let payload = req.body;
        let { id } = req.params;

        // update karena relasi dengan kategori
        if (payload.category) {
            let category = await category.findOne({name: {$regex: payload.category, $option: 'i'}});
        } else {
            delete payload.category;
        }
        
        if(req.file) {
            let tmp_path = req.file.path;
            let originalExt = req.file.originalName.split('.')[req.file.originalName.split('.').length - 1];
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootpath, `public/images/products/${filename}`);

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            src.on('end', async () => {
                try {
                    // let product = await Product.findById(id);
                    // let currentImage = `${config.rootPath}/public/images/products/${product.image_url}`;

                    // if(fs.existsSync(currentImage)) {
                    //     fs.unlinkSync(currentImage);
                    // }

                    let product = await Product.findByIdAndUpdate(id, payload, {
                        new: true,
                        runValidator: true
                    });
                    return res.json(product);
                } catch(err) {
                    fs.unlink(target_path);
                    if (err && err.name === "ValidationError") {
                        return res.json({
                            error: 1,
                            message: err.message,
                            fields: err.errors
                        })
                    }

                    next(err);
                }
            });

            src.on('error', async() => {
                next(err)
            });

        } else {
            let product =  await Product.findByIdAndUpdate(id, payload, {
                new: true,
                runValidator: true
            });
            return res.json(product);
        }
    } catch(err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: error.message,
                field: err.errors
            });
        }
        next(err)
    }
}

const destroy = async (req, res, next) => {
    try {
        let product = await Product.findByIdAndDelete(req.params.id);
        let currentImage = `${config.rootPath}/public/images/products/${product.image_url}`;
        if(fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage)
        }

        return res.json(product);
    } catch(err) {
        next(err);
    }
}

module.exports = {
    store,
    index,
    update,
    destroy
};