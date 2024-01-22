import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const clubSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  headName:{type: String, required: true},
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  createdDate:{type: String},
  description:{type: String},
  phoneNumber:{type: String},
  address:{type: String},
  photo:{type: String},
  
status:{
    type: String,
    enum: ["VALIDATED","BANNED"],
      default: "VALIDATED",
  },
  argument:{type:String},
  createdBy:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Soccer",
  }],
});
clubSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Club", clubSchema);
