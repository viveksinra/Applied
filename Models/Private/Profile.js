const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({

  experience:[{ 
   company: {
    type: String,
    default: ""
  },
  title:{
    type: String,
    default: ""
  },
  startDate:{
    type: String,
    default: ""
  },
  endDate:{
    type: String,
    default: ""
  },
  description:{
    type: String,
    default: ""
  },
}],
  certification:[{ 
   name: {
    type: String,
    default: ""
  },
  description:{
    type: String,
    default: ""
  }, 
}],
  awards:[{ 
   title: {
    type: String,
    default: ""
  },
  description:{
    type: String,
    default: ""
  }, 
}],

 
  // Add more fields as needed
  user: {
    type: Schema.Types.ObjectId,
    ref: "myUser",
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("myProfile", ProfileSchema);
