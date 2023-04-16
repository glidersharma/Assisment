const express = require("express");
const user = express();
const multer = require('multer');
const path = require('path');
const parser = require('body-parser');

user.use(parser.urlencoded({ extended: true }));
user.use(express.static(path.resolve(__dirname, 'public')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage });
const userController = require('../controller/UserController')
user.post('/upload', upload.single('file'), userController.importUser)
user.get('/:id', userController.getPolicy)
user.post('/:id', userController.updatepolicy)//update
user.delete('/:id', userController.deletePolicy)//delete
user.post('/', userController.createPolicy)//create

module.exports = user;