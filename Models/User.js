const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({

  profileType: {
    type: String,
    required:true,
    enum:["personal","business"]
  },

  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  primaryEmail: {
    type: String,
    default: ""
  },
  mobileNumber: {
    type: String,
    default: ""
  },
  password:{
    type:String,
    default:""
  },
  userImage: {
    type: String,
  },
  userName: {
    type: String,
    required: true
  },
  loginAllowed:{
    type:Boolean,
    default:true
  },
  value:{
    type:String,
    default:""
  },
// Profile data

employmentType: {
  type: String,
  default: ""

},
secondaryEmail:{
  type: String,
  default: ""
},
domainSkills: [{
  label:{
  type: String,
  default: ""
},
value:{
  type: String,
  default: ""
}
}],
personalSkills: [{
  label:{
  type: String,
  default: ""
},
value:{
  type: String,
  default: ""
}
}],
dob:{
  type: String,
  default: ""
},
  // Add more fields as needed

  creationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("myUser", UserSchema);
