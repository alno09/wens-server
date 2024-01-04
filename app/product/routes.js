const router = require('express').Router();
const multer = require('multer');
const os = require('os');

const productController = require('./controller');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/products');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage});

router.get('/products', productController.index);
router.post('/products', upload.single('image') , productController.store);
router.put('/products/:id', multer({dest: os.tmpdir()}).single('image') , productController.update);
router.delete('/products/:id', productController.destroy);

module.exports = router;