const express = require("express");
const { signupGet, signupPost } = require("../controller/signUp.controller");
const { upload } = require("../../../../extra/multer/multerCreate");
const signupRouter = express.Router();

signupRouter.get("/", signupGet);
signupRouter.post("/",upload.single('imgUrl'), signupPost);


module.exports = signupRouter;