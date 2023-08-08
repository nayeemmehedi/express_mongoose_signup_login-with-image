const mongoose = require("mongoose");
var validator = require("validator");
var bcrypt = require("bcrypt");
const { Schema } = mongoose;

const signupvalue = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },

    position: {
      type: String,
      enum: ["learner", "manager", "admin"],
      required: true,
      default: "learner",
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: validator.isEmail,
    },

    password: {
      type: String,
      required: true,

      // validate: {
      //   validator: (value) =>
      //     validator.isStrongPassword(value, {
      //       minLength: 6,
      //       minLowercase: 1,
      //       minNumber: 1,
      //       minUppercase: 1,
      //       minSymbols: 1,
      //     }),
      //   message: "Password {VALUE} is not Strong.",
      // },
    },
    confirmPassword: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return this.password === value;
        },
        message: "Password Not matches",
      },
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

signupvalue.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  this.confirmPassword=undefined;
  next();
});

const signup =  mongoose.model('signup', signupvalue);

 module.exports.signupCreate = signup
