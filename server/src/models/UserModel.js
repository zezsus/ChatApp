const mongoose = require("mongoose");
const { Schema } = mongoose;

const userShema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAvataImageSet: {
      type: Boolean,
      default: false,
    },
    avataImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userShema);
