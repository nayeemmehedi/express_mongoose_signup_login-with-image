// const { cloudinary } = require("../../../../extra/cloudinary");
const {  cloudinaryValue } = require("../../../../extra/cloudinary");
const { signUp, signupCreate } = require("../../../schema/schemaValue");

module.exports.signupGet = (req, res) => {
  res.json({
    message: "success..",
  });
};

module.exports.signupPost = async (req, res) => {
  try {
    const mainValue = new signupCreate(req.body);
    await mainValue.save();

    if(mainValue._id){
        cloudinaryValue.uploader
        .upload(req.file.path)
        .then(async (result) => {
          const user = await signupCreate.updateOne(
            { _id: mainValue._id },
            { $set: { imageUrl: result.secure_url } },
            { runValidators: true }
          );
  
          if (user.modifiedCount) {
            res.send({
              status: "success",
            });
          }else{
              res.send({ status: "NOT UPLOADING IMAGES"})
          }
  
          
        })
        .catch((err) => res.json({ status: "error", message: err.message }));
    }else{
        res.json({
            message:"sign up have some issue.. "
        })
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
