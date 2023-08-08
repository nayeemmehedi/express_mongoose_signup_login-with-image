const { signupCreate } = require("../../../schema/schemaValue");
const bcrypt = require("bcrypt");

var jwt = require('jsonwebtoken');






module.exports.loginRouterPost = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.send({
        message: "Email and password not matched..",
      });
    } else {
      console.log("dhukse");
      const valueFind = await signupCreate.find({ email: email });
      const value = valueFind[0];

     

      if (!value) {
        res.send({ message: "user not existed." });
      }

      const comparePassword = bcrypt.compareSync(password, value.password);
      const compareEmail = email === value.email;

      if (compareEmail && comparePassword) {

        const newvalueJwt = value
        const {password,...others} = newvalueJwt.toJSON();
        console.log(others)

  
       const jwtCreate = jwt.sign( {others}, process.env.crypto_password , { expiresIn: '1h' });


        res.send({ message: "sucees",token : jwtCreate});
      }
    }
  } catch (error) {
    res.send({
      error: error.message
    })
  }
};
