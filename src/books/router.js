const express = require('express');
const auth = require('../../middlewares/authentication');
const router = express.Router();
const multer = require('multer');
const { getBooks, addBook, getImageBook, deleteBooks } = require('./controller');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split('/')[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() *1E9) + '.' + extension
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage });

router
    .get('/', auth, getBooks)
    .get('/image/:fileName', getImageBook)
    .post('/', auth, upload.single('file'), addBook)
    .delete('/:idBook', deleteBooks)
    

module.exports = router